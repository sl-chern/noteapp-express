import INote from "./INote.js"
import INoteBody from "./INoteBody.js"

export default interface INotesRepository {
  findOne: (id: number) => Promise<INote>,
  createNote: (note: INoteBody) => Promise<void>,
  getAll: () => Promise<Array<INote>>
}