import { NextFunction, Request, Response } from "express"
import makeNotesDb from "../repositories/notes.repository.js"
import { PrismaClient } from "@prisma/client"
import INote from "../types/INote.js"

const prisma = new PrismaClient({
  log: ["query"]
})

const notesRepository = makeNotesDb(prisma.note)

const findNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const note: INote = await notesRepository.findNote(+id)
    res.status(200).json(note)
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: "Something went wrong"})
  }
}

const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, content, category } = req.body
    await notesRepository.createNote({
      name,
      content,
      category
    })
    res.status(201).json({message: "Note was created"})
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: "Something went wrong"})
  }
}

const getAllNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const notes: Array<INote> = await notesRepository.getAllNotes()
    res.status(200).json({notes})
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: "Something went wrong"})
  }
}

const removeNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    await notesRepository.removeNote(+id)
    res.status(204)
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: "Something went wrong"})
  }
}

const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { body } = req
    
    await notesRepository.updateNote({ 
      id: +id, 
      note: {
        ...body
      } 
    })
    res.status(200).json({ message: "Note was updated" })
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: "Something went wrong"})
  }
}

const notesService = Object.freeze({
  findNote,
  createNote,
  getAllNotes,
  removeNote,
  updateNote
})

export default notesService