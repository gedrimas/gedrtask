import roundTo from "round-to";
import AggrDataForCommEval from "./AggrDataForCommEval.js";
import CommissionCounter from "./CommissionCounter.js";
import moment from "moment";
import util from "util";

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

const foo = async () => {
  try {
    const CommissionAggrData = new AggrDataForCommEval(o);
    await CommissionAggrData.getAggregateDataForCommEval();
    //console.log("INPUT", CommissionAggrData.inputDataWithConfig);
    const operationsWithConfig = CommissionAggrData.inputDataWithConfig;

    const t = new CommissionCounter(operationsWithConfig).countCommissions();

    console.log(util.inspect(t, { showHidden: false, depth: null }));
  } catch (error) {
    console.log("TEST", error.message);
  }
};

foo();

// const t = new CommissionCounter(o).countCommissions();
// console.log(util.inspect(t, { showHidden: false, depth: null }));
// var weeknumber = moment("2016-02-15", "YYYYMMDD").isoWeek();
// console.log("weeknumber", weeknumber);

// var day = moment("2021-01-01", "YYYYMMDD").format("dddd");
// console.log("day", day);
