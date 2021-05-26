import axios from 'axios'

const fetchConfig = async (type, user_type) => {
  let endpoint = ''

  if (type === 'cash_in') {
    endpoint = 'cash-in'
  }

  if ((type === 'cash_out') & (user_type === 'natural')) {
    endpoint = 'cash-out-natural'
  }

  if ((type === 'cash_out') & (user_type === 'juridical')) {
    endpoint = 'cash-out-juridical'
  }

  try {
    //fetch config appropriate config
    const response = await axios(
      `https://private-00d723-paysera.apiary-proxy.com/${endpoint}`,
    )
    const { data } = response
    return data
  } catch (e) {
    throw new Error(`Error to fetch config from ${endpoint} endpoint`)
  }
}

export default fetchConfig
