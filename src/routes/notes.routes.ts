import { Router } from "express"
import notesService from "../services/notes.service.js"
import middlewares from "../services/middlewares.js"
import notesSchemas from "../services/schemas/notes.schemas.js"

const router = Router()

router.route('/')
  .post(await middlewares.validate(notesSchemas.createNoteSchema), notesService.createNote)
  .get(notesService.getAllNotes)
router.route('/:id')
  .get(await middlewares.validate(notesSchemas.findNoteSchema), notesService.findNote)
  .delete()
  .patch()

export default router