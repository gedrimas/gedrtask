import AggrDataForCommEval from "./AggrDataForCommEval.js";
import CommissionCounter from "./CommissionCounter.js";
import fs from "fs";

const fileNames = process.argv.splice(2);
const fileName = fileNames[0];

function fsReadFileSynchToArray(filePath) {
  var data = JSON.parse(fs.readFileSync(filePath));
  return data;
}

//get operations from file
const operations = fsReadFileSynchToArray(fileName);

const getCommissions = async (operations) => {
  try {
    const CommissionAggrData = new AggrDataForCommEval(operations);
    await CommissionAggrData.getAggregatedDataForCommEval();
    const operationsWithConfig = CommissionAggrData.inputDataWithConfig;

    const commissions = new CommissionCounter(
      operationsWithConfig
    ).countCommissions();

    commissions.forEach((commission) => console.log(commission));
  } catch (error) {
    console.log("Error", error.message);
  }
};

getCommissions(operations);
