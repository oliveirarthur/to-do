import axios from 'axios'
import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'

const BASE_URL = 'https://apilayer.net/api/'

export const mailboxLayerValidator = async (email) => {
  await validator.validate({
    schema: schema.create({
      email: schema.string({}, [rules.email()]),
    }),
    data: {
      email,
    },
  })

  const { data } = await axios.get(`${BASE_URL}check`, {
    params: {
      email,
      access_key: process.env.MAILBOX_LAYER_KEY,
    },
  })

  return data
}
