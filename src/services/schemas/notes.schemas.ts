import * as yup from 'yup'

const checkNoteIdSchema = yup.object().shape({
  body: yup.object().shape({}),
  params: yup.object().shape({
    id: yup.number().min(1).required()
  })
})

const createNoteSchema = yup.object().shape({
  body: yup.object().shape({
    name: yup.string().min(1).required(),
    content: yup.string().min(1).required(),
    category: yup.string().oneOf(["Idea", "Task", "Random Thought"]).required()
  }),
  params: yup.object().shape({})
})

const updateNoteSchema = yup.object().shape({
  body: yup.object().shape({
    name: yup.string().min(1),
    content: yup.string().min(1),
    category: yup.string().oneOf(["Idea", "Task", "Random Thought"])
  }),
  params: yup.object().shape({
    id: yup.number().min(1).required()
  })
})

const notesSchemas = Object.freeze({
  checkNoteIdSchema,
  createNoteSchema,
  updateNoteSchema
})

export default notesSchemas