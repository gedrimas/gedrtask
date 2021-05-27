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
  commissionCalculator(sum, percent, maxComAmount) {
    console.log("sum", sum);
    console.log("percent", percent);

    const commBeforeRounding = (sum * percent) / 100;
    if (commBeforeRounding > maxComAmount) return 5;
    const roundedCommition = roundTo.up(commBeforeRounding, 2);
    return roundedCommition;
  }

  cash_in() {
    return this.cashIn.map((operation) => {
      const {
        date,
        operation: { amount: operAmount },
        percents,
        max: { amount: maxComAmount },
      } = operation;

      return {
        commission: this.commissionCalculator(
          operAmount,
          percents,
          maxComAmount
        ),
        date: date,
      };
    });
  }
}
