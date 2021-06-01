import roundTo from "round-to";
import moment from "moment";

export default class CommissionCounter {
  constructor(allOperations) {
    this.allOperations = allOperations;
  }

  //calculate commission
  //   commissionCalculator(sum, percent, maxComAmount) {
  //     const commBeforeRounding = (sum * percent) / 100;
  //     if (commBeforeRounding > maxComAmount) return 5;
  //     const roundedCommition = roundTo.up(commBeforeRounding, 2);
  //     return roundedCommition;
  //   }

  // count commission based pecents only
  #getCommonCommission = (sum, percents) => {
    return (sum * percents) / 100;
  };

  //ssplits array of objects to some nested arrays with objects that contains particular value
  #splitArrayByObjKey = (arrayOfObjets, key, checkFunction) => {
    const result = arrayOfObjets.map((outerItem) => {
      const filterdArray = arrayOfObjets.filter((innerItem, i) => {
        if (checkFunction(outerItem[key], innerItem[key])) {
          delete arrayOfObjets[i];
          return true;
        }
        return false;
      });
      return filterdArray;
    });

    //remove empty elemtnts from array
    const filteredResult = result.filter((element) => element != null);

    return filteredResult;
  };

  //get array of arrays of each users operations
  #splitOperationsByUserId = (cashOutNatOperations) => {
    //helper function to filter operations by user id
    const checkByUserId = (outerCycleUserId, innerCycleUserId) => {
      const isTheSameUeser = outerCycleUserId === innerCycleUserId;
      return isTheSameUeser;
    };

    const result = this.#splitArrayByObjKey(
      cashOutNatOperations,
      "user_id",
      checkByUserId
    );
    return result;
  };

  //get array of arrays of weekly operations by pacticular user
  #splitEachUserOperationsByWeekNumber = (userOperations) => {
    //helper function to filter operations by week number
    const checkByWeekNumber = (outerCycleDate, innerCycleDate) => {
      //helper function retuns week number
      const getWeekNumber = (date) => {
        return moment(`${date}`, "YYYYMMDD").isoWeek();
      };

      const isTheSameWeekNumber =
        getWeekNumber(outerCycleDate) === getWeekNumber(innerCycleDate);
      return isTheSameWeekNumber;
    };

    const result = this.#splitArrayByObjKey(
      userOperations,
      "date",
      checkByWeekNumber
    );
    return result;
  };

  //get cash_in commissions
  #cash_in = (cashInOperations) => {
    const result = cashInOperations.map((operation) => {
      const {
        date,
        operation: { amount: operAmount },
        percents,
        max: { amount: maxComAmount },
      } = operation;

      //general comission
      const commBasedPercentsOnly = this.#getCommonCommission(
        operAmount,
        percents
      );

      //restrict commission amout up to 5 eur
      const commission =
        commBasedPercentsOnly > maxComAmount ? 5 : commBasedPercentsOnly;

      return {
        commission,
        date,
      };
    });
    return result;
  };

  //get cash out commissions for natural persons
  #cash_out_natural(cashOutNaturalOperations) {
    //get arrays of each users commissions
    const splitedByUserId = this.#splitOperationsByUserId(
      cashOutNaturalOperations
    );

    //get arrays of weekly operations
    const splitUserOperationsByWeekNum = splitedByUserId.map(
      (userOperations) => {
        return this.#splitEachUserOperationsByWeekNumber(userOperations);
      }
    );

    const weeklyCommissionCounter = (eachUserOprations) => {
      const cashOutNatCommissions = [];

      //take array of users operations
      eachUserOprations.forEach((weeksOperations) => {
        let weeklyCashOutSum = 0;
        let isWeeklyLimitExceeded = false;

        //take array of weekly operations
        weeksOperations.forEach((operation) => {
          const {
            date,
            percents,
            operation: { amount: operAmount },
            week_limit: { amount: maxComAmountPerWeek },
          } = operation;

          //each loop adds operation amount to get sum of weekly operations
          weeklyCashOutSum += operAmount;

          //commission is 0 if cash out sum does not exceed max value per week
          let commission = 0;

          //if weekly cash out more than max value
          if (isWeeklyLimitExceeded) {
            //commission calculation based on exceeded sum
            commission = this.#getCommonCommission(operAmount, percents);
          } else if (weeklyCashOutSum > maxComAmountPerWeek) {
            //if weekly sum of cash out for natural persons is exceeded set mark to true
            isWeeklyLimitExceeded = true;
            const exceededSum = weeklyCashOutSum - maxComAmountPerWeek;
            //commission calculation based on exceeded sum
            commission = this.#getCommonCommission(exceededSum, percents);
          }

          cashOutNatCommissions.push({ commission, date });
        });
      });

      return cashOutNatCommissions;
    };

    //get all commissions for cash out by natural persons
    const cashOutNatCom = splitUserOperationsByWeekNum.map(
      (weeklyhUserOprations) => {
        const commissions = weeklyCommissionCounter(weeklyhUserOprations);
        return commissions;
      }
    );

    //flatten the array of commissions
    const allCashOutNatCommitions = cashOutNatCom.flat();
    return allCashOutNatCommitions;
  }

  //get cash out commissions for leagal persons
  #cash_out_legal(cashOutLegalOperations) {
    const result = cashOutLegalOperations.map((operation) => {
      const {
        date,
        operation: { amount: operAmount },
        percents,
        min: { amount: minComAmount },
      } = operation;

      //get general commission
      const commBasedPercentsOnly = this.#getCommonCommission(
        operAmount,
        percents
      );

      //set commission not less than min value
      const commission =
        commBasedPercentsOnly < minComAmount ? 0.5 : commBasedPercentsOnly;

      return {
        commission,
        date,
      };
    });
    return result;
  }

  //returns all commissions
  countCommissions = () => {
    //filters all operations by thier type and user type
    const getAllOperationsOfExactType = (opType, opUser_type) => {
      if (opType && opUser_type) {
        const operations = this.allOperations.filter((operation) => {
          const { type, user_type } = operation;
          return opType === type && opUser_type === user_type;
        });
        return operations;
      } else if (opType) {
        const operations = this.allOperations.filter((operation) => {
          const { type } = operation;
          return opType === type;
        });
        return operations;
      } else {
        return [];
      }
    };

    //cash in operations only
    const cashIn = getAllOperationsOfExactType("cash_in");

    //cash out operations for natural persons only
    const cashOutNatural = getAllOperationsOfExactType("cash_out", "natural");

    //cash out operations for legal persons only
    const cashOutLegal = getAllOperationsOfExactType("cash_out", "juridical");

    //get array of commissions with their dates
    const allComissions = [
      ...this.#cash_in(cashIn),
      ...this.#cash_out_natural(cashOutNatural),
      ...this.#cash_out_legal(cashOutLegal),
    ];

    //order commissions by date (ACS)
    const sortedCommissions = allComissions.sort((a, b) => {
      return moment(a.date).diff(b.date);
    });

    //round results
    const result = sortedCommissions.map((item) => {
      return roundTo.up(item.commission, 2).toFixed(2);
    });

    return result;
  };
}
