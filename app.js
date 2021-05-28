import roundTo from "round-to";
import AggrDataForCommEval from "./AggrDataForCommEval.js";
import CommissionCounter from "./CommissionCounter.js";
import moment from "moment";

const o = [
  {
    date: "2016-01-05",
    user_id: 1,
    user_type: "natural",
    type: "cash_in",
    operation: { amount: 200.0, currency: "EUR" },
  },
  {
    date: "2016-01-06",
    user_id: 2,
    user_type: "juridical",
    type: "cash_out",
    operation: { amount: 300.0, currency: "EUR" },
  },
  {
    date: "2016-01-06",
    user_id: 1,
    user_type: "natural",
    type: "cash_out",
    operation: { amount: 30000, currency: "EUR" },
  },
  {
    date: "2016-01-07",
    user_id: 1,
    user_type: "natural",
    type: "cash_out",
    operation: { amount: 1000.0, currency: "EUR" },
  },
  {
    date: "2016-01-07",
    user_id: 1,
    user_type: "natural",
    type: "cash_out",
    operation: { amount: 100.0, currency: "EUR" },
  },
  {
    date: "2016-01-10",
    user_id: 1,
    user_type: "natural",
    type: "cash_out",
    operation: { amount: 100.0, currency: "EUR" },
  },
  {
    date: "2016-01-10",
    user_id: 2,
    user_type: "juridical",
    type: "cash_in",
    operation: { amount: 1000000.0, currency: "EUR" },
  },
  {
    date: "2016-01-10",
    user_id: 3,
    user_type: "natural",
    type: "cash_out",
    operation: { amount: 1000.0, currency: "EUR" },
  },
  {
    date: "2016-02-15",
    user_id: 1,
    user_type: "natural",
    type: "cash_out",
    operation: { amount: 300.0, currency: "EUR" },
  },
];

// const foo = async () => {
//   try {
//     const CommissionAggrData = new AggrDataForCommEval(o);
//     await CommissionAggrData.getAggregateDataForCommEval();
//     console.log("INPUT", CommissionAggrData.inputDataWithConfig);
//   } catch (error) {
//     console.log("TEST", error.message);
//   }
// };

// foo();

// const t = new CommissionCounter().splitOperationsByUserId();
// console.log(t);

Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

// const t = new Date("2019-01-07");
// console.log("t", t);
// console.log("t", t.getWeek());

var weeknumber = moment("2020-12-30", "YYYYMMDD").isoWeek();
console.log("weeknumber", weeknumber);

var day = moment("2021-01-01", "YYYYMMDD").format("dddd");
console.log("day", day);
