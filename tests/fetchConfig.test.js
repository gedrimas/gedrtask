import AggrDataForCommEval from '../AggrDataForCommEval.js'

const mokOperations = [
  {
    date: 'FAKE_DATE',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_in',
    operation: { amount: 200.0, currency: 'EUR' },
  },
  {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' },
  },
  {
    date: '2016-01-06',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 30000, currency: 'EUR' },
  },
  {
    date: '2016-01-07',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 1000.0, currency: 'EUR' },
  },
  {
    date: '2016-01-07',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 100.0, currency: 'EUR' },
  },
  {
    date: '2016-01-10',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 100.0, currency: 'EUR' },
  },
  {
    date: '2016-01-10',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_in',
    operation: { amount: 1000000.0, currency: 'EUR' },
  },
  {
    date: '2016-01-10',
    user_id: 3,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 1000.0, currency: 'EUR' },
  },
  {
    date: '2016-02-15',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' },
  },
]

describe('calss AggrDataForCommEval', () => {
  test('isInputDataValid method throws Error if input values are not correct', async () => {
    const commissionAggrData = new AggrDataForCommEval(mokOperations)
    const generalProps = commissionAggrData.generalProps
    const operationProps = commissionAggrData.operationProps

    expect(() => {
      commissionAggrData.isInpitDataValid(generalProps, operationProps)
    }).toThrow()
  })
})
