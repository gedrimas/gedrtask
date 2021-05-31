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
  getCommonCommission(sum, percents) {
    return (sum * percents) / 100;
  }

  splitArrayByObjKey = (arrayOfObjets, key, checkFunction) => {
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

    //remove empty elemtnts and return array of filtered arrays
    return result.filter((element) => element != null);
  };

  splitOperationsByUserId = (cashOutNatOperations) => {
    const checkByUserId = (outerCycleUserId, innerCycleUserId) => {
      const result = outerCycleUserId === innerCycleUserId;
      return result;
    };

    return this.splitArrayByObjKey(
      cashOutNatOperations,
      "user_id",
      checkByUserId
    );
  };

  splitEachUserOperationsByWeekNumber = (userOperations) => {
    const checkByWeekNumber = (outerCycleDate, innerCycleDate) => {
      const getWeekNumber = (date) => {
        return moment(`${date}`, "YYYYMMDD").isoWeek();
      };

      const result =
        getWeekNumber(outerCycleDate) === getWeekNumber(innerCycleDate);
      return result;
    };
    return this.splitArrayByObjKey(userOperations, "date", checkByWeekNumber);
  };

  cash_in(cashInOperations) {
    const result = cashInOperations.map((operation) => {
      const {
        date,
        operation: { amount: operAmount },
        percents,
        max: { amount: maxComAmount },
      } = operation;

      const commBasedPercentsOnly = this.getCommonCommission(
        operAmount,
        percents
      );

      const commission =
        commBasedPercentsOnly > maxComAmount ? 5 : commBasedPercentsOnly;

      return {
        commission,
        date,
      };
    });
    return result;
  }

  cash_out_natural(cashOutNaturalOperations) {
    const splitedByUserId = this.splitOperationsByUserId(
      cashOutNaturalOperations
    );
    const splitUserOperationsByWeekNum = splitedByUserId.map(
      (userOperations) => {
        return this.splitEachUserOperationsByWeekNumber(userOperations);
      }
    );

    const weeklyCommitionCounter = (eachUserOprations) => {
      const cashOutNatCommissions = [];

      eachUserOprations.forEach((weeksOperations) => {
        let weeklyCashOutSum = 0;
        let isWeeklyLimitExceeded = false;

        weeksOperations.forEach((operation) => {
          const {
            date,
            percents,
            operation: { amount: operAmount },
            week_limit: { amount: maxComAmountPerWeek },
          } = operation;

          weeklyCashOutSum += operAmount;
          let commission = 0;

          if (isWeeklyLimitExceeded) {
            commission = this.getCommonCommission(operAmount, percents);
          } else if (weeklyCashOutSum > maxComAmountPerWeek) {
            isWeeklyLimitExceeded = true;
            const exceededSum = weeklyCashOutSum - maxComAmountPerWeek;
            commission = this.getCommonCommission(exceededSum, percents);
          }

          cashOutNatCommissions.push({ date, commission });
        });
      });

      return cashOutNatCommissions;
    };

    const cashOutNatCom = splitUserOperationsByWeekNum.map(
      (weeklyhUserOprations) => {
        const commissions = weeklyCommitionCounter(weeklyhUserOprations);
        return commissions;
      }
    );

    const allCashOutNatCommitions = cashOutNatCom.flat();
    return allCashOutNatCommitions;
  }

  cash_out_legal(cashOutLegalOperations) {
    const result = cashOutLegalOperations.map((operation) => {
      const {
        date,
        operation: { amount: operAmount },
        percents,
        min: { amount: minComAmount },
      } = operation;

      const commBasedPercentsOnly = this.getCommonCommission(
        operAmount,
        percents
      );

      const commission =
        commBasedPercentsOnly < minComAmount ? 0.5 : commBasedPercentsOnly;

      return {
        commission,
        date,
      };
    });
    return result;
  }

  countCommissions = () => {
    const getAllCommissiOfExactType = (opType, opUser_type) => {
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

    const cashIn = getAllCommissiOfExactType("cash_in");
    const cashOutNatural = getAllCommissiOfExactType("cash_out", "natural");
    const cashOutLegal = getAllCommissiOfExactType("cash_out", "juridical");

    const allComissions = [
      ...this.cash_in(cashIn),
      ...this.cash_out_natural(cashOutNatural),
      ...this.cash_out_legal(cashOutLegal),
    ];

    return allComissions;
  };
}
