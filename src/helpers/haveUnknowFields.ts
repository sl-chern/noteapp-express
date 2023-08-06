import { Schema } from "yup"

const haveUnknownFields = (schema: Schema, body: object | undefined): boolean => {
  const bodyKeys = Object.keys(schema.getDefault().body || {})
  const unknownFields = Object.keys(body || {}).filter(field => !bodyKeys.includes(field))
  return unknownFields.length > 0 ? true : false
}

export default haveUnknownFields