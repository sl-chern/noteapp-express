import INoteBody from "./INoteBody.js";

export default interface INote extends INoteBody {
  id: number;
  created: Date;
  archived: boolean
}