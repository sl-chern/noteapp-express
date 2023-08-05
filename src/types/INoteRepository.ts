import { DataToUpdate } from "./DataToUpdate.js"
import INote from "./INote.js"
import INoteBody from "./INoteBody.js"

export default interface INotesRepository {
  findNote: (id: number) => Promise<INote>,
  createNote: (note: INoteBody) => Promise<void>,
  getAllNotes: () => Promise<Array<INote>>,
  removeNote: (id: number) => Promise<void>,
  updateNote: (data: DataToUpdate) => Promise<void>
}