import roundTo from "round-to";
import moment from "moment";

export default class CommissionCounter {
  //   constructor(operationData) {
  //     this.operationData = operationData;
  //   }

  cashIn = [
    {
      date: "2016-01-05",
      user_id: 1,
      user_type: "natural",
      type: "cash_in",
      operation: { amount: 200, currency: "EUR" },
      percents: 0.03,
      max: { amount: 5, currency: "EUR" },
    },
    {
      date: "2016-01-10",
      user_id: 2,
      user_type: "juridical",
      type: "cash_in",
      operation: { amount: 1000000, currency: "EUR" },
      percents: 0.03,
      max: { amount: 5, currency: "EUR" },
    },
  ];

  //calculate commission
  //   commissionCalculator(sum, percent, maxComAmount) {
  //     const commBeforeRounding = (sum * percent) / 100;
  //     if (commBeforeRounding > maxComAmount) return 5;
  //     const roundedCommition = roundTo.up(commBeforeRounding, 2);
  //     return roundedCommition;
  //   }

  // count commission based pecents only
  getCommPercentsOnly(sum, percents) {
    return (sum * percents) / 100;
  }

  cash_in() {
    return this.cashIn.map((operation) => {
      const {
        date,
        operation: { amount: operAmount },
        percents,
        max: { amount: maxComAmount },
      } = operation;

      const commBasedPercentsOnly = this.getCommPercentsOnly(
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
  }

  cashOutNatural = [
    {
      date: "2016-01-06",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 30000, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-01-07",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 1000, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-01-07",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 100, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-01-10",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 100, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-01-10",
      user_id: 3,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 1000, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-02-15",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 300, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },

    {
      date: "2016-01-10",
      user_id: 2,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 1000, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-02-15",
      user_id: 2,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 300, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-02-18",
      user_id: 2,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 300, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-02-21",
      user_id: 2,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 300, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-02-22",
      user_id: 2,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 300, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
  ];

  weekOperations = [
    {
      date: "2016-01-06", //1
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 30000, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-01-07", //1
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 1000, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-01-07", //1
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 100, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-01-10", //1
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 100, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-02-15", //7
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 300, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-02-18",
      user_id: 2,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 300, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-02-21",
      user_id: 2,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 300, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
    {
      date: "2016-02-22",
      user_id: 2,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 300, currency: "EUR" },
      percents: 0.3,
      week_limit: { amount: 1000, currency: "EUR" },
    },
  ];

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

  cash_out_natural() {
    const splitedByUserId = this.splitOperationsByUserId(this.cashOutNatural);
    const splitUserOperationsByWeekNum = splitedByUserId.map(
      (userOperations) => {
        return this.splitEachUserOperationsByWeekNumber(userOperations);
      }
    );
    return splitUserOperationsByWeekNum;
    // this.cashOutNatural.map((operation) => {
    //   const {
    //     user_id,
    //     date,
    //     operation: { amount: operAmount },
    //     week_limit: { amount: maxComAmountPerWeek },
    //   } = operation;
    // });
  }
}
