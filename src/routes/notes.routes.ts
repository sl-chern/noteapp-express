import { Router } from "express"
import notesService from "../services/notes.service.js"
import middlewares from "../services/middlewares.js"
import notesSchemas from "../services/schemas/notes.schemas.js"

const router = Router()

router.route('/')
  .post(await middlewares.validate(notesSchemas.createNoteSchema), notesService.createNote)
  .get(await middlewares.validate(notesSchemas.emptySchema), notesService.getAllNotes)
router.route('/stats')
  .get(await middlewares.validate(notesSchemas.emptySchema), notesService.getNotesStats)
router.route('/:id')
  .get(await middlewares.validate(notesSchemas.checkNoteIdSchema), notesService.findNote)
  .delete(await middlewares.validate(notesSchemas.checkNoteIdSchema), notesService.removeNote)
  .patch(await middlewares.validate(notesSchemas.updateNoteSchema), notesService.updateNote)

export default router