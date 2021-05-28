import roundTo from "round-to";

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
  ];

  splitOperationsByUserId() {
    const operationsByUserId = this.cashOutNatural.map((operation) => {
      const userOperations = this.cashOutNatural.filter((userOperation, i) => {
        if (operation.user_id === userOperation.user_id) {
          delete this.cashOutNatural[i];
          return true;
        }
        return false;
      });

      return userOperations;
    });

    //remove empty elemtnts and return arrays of operations of each user
    return operationsByUserId.filter((element) => element != null);
  }

  cash_out_natural() {
    this.cashOutNatural.map((operation) => {
      const {
        user_id,
        date,
        operation: { amount: operAmount },
        week_limit: { amount: maxComAmountPerWeek },
      } = operation;
    });
  }
}
