import * as yup from 'yup'

const findNoteSchema = yup.object().shape({
  body: yup.object().shape({}),
  params: yup.object().shape({
    id: yup.number().min(1)
  })
})

const createNoteSchema = yup.object().shape({
  body: yup.object().shape({
    name: yup.string().min(1),
    content: yup.string().min(1),
    category: yup.string().oneOf(["Idea", "Task", "Random Thought"])
  }),
  params: yup.object().shape({})
})

const notesSchemas = Object.freeze({
  findNoteSchema,
  createNoteSchema
})

export default notesSchemas