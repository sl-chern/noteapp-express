import { Prisma } from ".prisma/client"
import INote from "../types/INote.js"
import INoteBody from "../types/INoteBody.js"
import INotesRepository from "../types/INoteRepository.js"

const makeNotesDb = (notes: Prisma.NoteDelegate): INotesRepository => {
  const findOne = async (id: number): Promise<INote> => {
    const note: INote = await notes.findFirst({
      where: {
        id
      }
    })
    return note
  }
  const createNote = async (note: INoteBody): Promise<void> => {
    await notes.create({
      data: { 
        ...note,
        created: new Date()
      }
    })
  }
  const getAll = async (): Promise<Array<INote>> => {
    const allNotes: Array<INote> = await notes.findMany()
    return allNotes
  }

  return Object.freeze<INotesRepository>({
    findOne,
    createNote,
    getAll
  })
}

export default makeNotesDb