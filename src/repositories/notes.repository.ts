import { Prisma } from ".prisma/client"
import INote from "../types/INote.js"
import INoteBody from "../types/INoteBody.js"
import INotesRepository from "../types/INoteRepository.js"
import { DataToUpdate } from "../types/DataToUpdate.js"
import { GroupedCategory } from "../types/GroupedCategory.js"

const getNotesRepository = (notes: Prisma.NoteDelegate): INotesRepository => {
  const findNote = async (id: number): Promise<INote> => {
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
  const getAllNotes = async (): Promise<Array<INote>> => {
    const allNotes: Array<INote> = await notes.findMany()
    return allNotes
  }
  const removeNote = async (id: number): Promise<void> => {
    await notes.delete({
      where: {
        id
      }
    })
  }
  const updateNote = async (data: DataToUpdate): Promise<void> => {
    await notes.update({
      data: { 
        ...data.note
      },
      where: {
        id: data.id
      }
    })
  }
  const getNotesCount = async (archived: boolean): Promise<Array<GroupedCategory>> => {
    const stats = await notes.groupBy({
      by: ["category"],
      where: {
        archived
      },
      _count: true
    })
    return stats
  }

  return Object.freeze<INotesRepository>({
    findNote,
    createNote,
    getAllNotes,
    removeNote,
    updateNote,
    getNotesCount
  })
}

export default getNotesRepository