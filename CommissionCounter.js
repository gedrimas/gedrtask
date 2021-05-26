import fetchConfig from "./api/fetchConfig.js";

export default class CommissionCounter {
  result = null;
  inputDataWithConfig = [];

  constructor(inputData) {
    this.inputData = inputData;
  }

  //check if input data are valid
  isInpitDatavalid(props, operationProps) {
    this.inputData.forEach((operationObj) => {
      props.forEach((prop) => {
        if (operationObj.hasOwnProperty(prop)) {
          switch (prop) {
            case "date":
              //TODO
              if (typeof operationObj[prop] !== "string") {
                this.result = "Invalid input file";
                return;
              }
              break;
            case "user_id":
              if (typeof operationObj[prop] !== "number") {
                this.result = "Invalid input file";
                return;
              }
              break;

            case "user_type":
              if (
                !(
                  (operationObj[prop] === "natural") |
                  (operationObj[prop] === "juridical")
                )
              ) {
                this.result = "Invalid input file";
                return;
              }
              break;

            case "type":
              if (
                !(
                  (operationObj[prop] === "cash_in") |
                  (operationObj[prop] === "cash_out")
                )
              ) {
                this.result = "Invalid input file";
                return;
              }
              break;

            case "operation":
              const operObj = operationObj[prop];
              operationProps.forEach((prop) => {
                if (operObj.hasOwnProperty(prop)) {
                  switch (prop) {
                    case "amount":
                      if (typeof operObj[prop] !== "number") {
                        this.result = "Invalid input file";
                        return;
                      }
                      break;
                    case "currency":
                      if (operObj[prop] !== "EUR") {
                        this.result = "Invalid input file";
                        return;
                      }
                      break;
                  }
                } else {
                  this.result = "Invalid input file";
                  return;
                }
              });
          }
        } else {
          this.result = "Invalid input file";
          return;
        }
      });
    });
  }

  //get config from API and merge it with operation object
  async getConfig() {
    const input = this.inputData;
    async function* configGen() {
      try {
        for (let i = 0; i < input.length; i++) {
          const { type, user_type } = input[i];
          const config = await fetchConfig(type, user_type);
          yield { ...input[i], ...config };
        }
      } catch (error) {
        this.result = error.message;
      }
    }
    const gen = configGen.call(this);
    for await (let val of gen) {
      this.inputDataWithConfig.push(val);
    }
  }

  //calculate commission
  commissionCalculator(sum, percent) {
    return (sum * percent) / 100;
  }
}
