import fetchConfig from './api/fetchConfig.js'
import moment from 'moment'

export default class AggrDataForCommEval {
  inputDataWithConfig = []
  generalProps = ['date', 'user_id', 'user_type', 'type', 'operation']
  operationProps = ['amount', 'currency']

  constructor(inputData) {
    this.inputData = inputData
  }

  //check is date valid
  isValidDate = (date) => {
    const dateObj = new Date(date)
    return (
      Object.prototype.toString.call(dateObj) === '[object Date]' &&
      !Number.isNaN(dateObj.getTime())
    )
  }

  /**
   * check if input data are valid
   * (To tell you the truth I really
   * dislike this method - it isn't flexible and could be written
   * in a better way but I think it should be)
   */
  isInpitDataValid = (generalProps, operationProps) => {
    this.inputData.forEach((operationObj) => {
      generalProps.forEach((prop) => {
        if (operationObj.hasOwnProperty(prop)) {
          switch (prop) {
            case 'date':
              if (!this.isValidDate(operationObj[prop])) {
                throw new Error('Invalid input data')
              }
              break
            case 'user_id':
              if (typeof operationObj[prop] !== 'number') {
                throw new Error('Invalid input data')
              }
              break

            case 'user_type':
              if (
                !(
                  (operationObj[prop] === 'natural') |
                  (operationObj[prop] === 'juridical')
                )
              ) {
                throw new Error('Invalid input data')
              }
              break

            case 'type':
              if (
                !(
                  (operationObj[prop] === 'cash_in') |
                  (operationObj[prop] === 'cash_out')
                )
              ) {
                throw new Error('Invalid input data')
              }
              break

            case 'operation':
              const operObj = operationObj[prop]
              operationProps.forEach((prop) => {
                if (operObj.hasOwnProperty(prop)) {
                  switch (prop) {
                    case 'amount':
                      if (typeof operObj[prop] !== 'number') {
                        throw new Error('Invalid input data')
                      }
                      break
                    case 'currency':
                      if (operObj[prop] !== 'EUR') {
                        throw new Error('Invalid input data')
                      }
                      break
                  }
                } else {
                  throw new Error('Invalid input data')
                }
              })
          }
        } else {
          throw new Error('Invalid input data')
        }
      })
    })
  }

  //get config from API and merge it with operation object
  async getConfig() {
    const input = this.inputData
    async function* configGen() {
      try {
        for (let i = 0; i < input.length; i++) {
          const { type, user_type } = input[i]
          const config = await fetchConfig(type, user_type)
          yield { ...input[i], ...config }
        }
      } catch (error) {
        throw new Error('Getting config from API Error')
      }
    }
    const gen = configGen.call(this)
    for await (let val of gen) {
      this.inputDataWithConfig.push(val)
    }
  }

  async getAggregatedDataForCommEval() {
    this.isInpitDataValid(this.generalProps, this.operationProps)
    await this.getConfig()
  }
}
