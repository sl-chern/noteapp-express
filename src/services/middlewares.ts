import { NextFunction, Request, Response } from "express"
import { Schema } from "yup"

const validate = async (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const body = req.body
      const params = req.params
      await schema.validate({body, params})
      return next()
    }
    catch(error) {
      return res.status(400).json({error})
    }
  }
}

const middlewares = Object.freeze({
  validate
})

export default middlewares