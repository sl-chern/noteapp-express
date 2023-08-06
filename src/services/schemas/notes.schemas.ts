import * as yup from 'yup'
import categories from '../../data/categories.js'

const checkNoteIdSchema = yup.object().shape({
  body: yup.object().shape({}),
  params: yup.object().shape({
    id: yup.string().test('is-number', 'id must be a number', value => !isNaN(+value))
  })
})

const createNoteSchema = yup.object().shape({
  body: yup.object().shape({
    name: yup.string().min(1).required(),
    content: yup.string().min(1).required(),
    category: yup.string().oneOf(categories).required()
  }),
  params: yup.object().shape({})
})

const updateNoteSchema = yup.object().shape({
  body: yup.object().shape({
    name: yup.string().min(1),
    content: yup.string().min(1),
    category: yup.string().oneOf(categories),
    archived: yup.boolean()
  }),
  params: yup.object().shape({
    id: yup.string().test('is-number', 'id must be a number', value => !isNaN(+value))
  })
})

const emptySchema = yup.object().shape({
  body: yup.object().shape({}),
  params: yup.object().shape({})
})

const notesSchemas = Object.freeze({
  checkNoteIdSchema,
  createNoteSchema,
  updateNoteSchema,
  emptySchema
})

export default notesSchemas

export type CreateNoteSchema = Required<yup.InferType<typeof checkNoteIdSchema>>