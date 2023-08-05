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
    const note: INote = await notesRepository.findOne(+id)
    res.status(200).json(note)
  }
  catch(err) {
    console.log(err)
    res.status(500).json({messge: "Something went wrong"})
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
    res.status(201).json({messge: "Note was created"})
  }
  catch(err) {
    console.log(err)
    res.status(500).json({messge: "Something went wrong"})
  }
}

const getAllNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const notes: Array<INote> = await notesRepository.getAll()
    res.status(200).json({notes})
  }
  catch(err) {
    console.log(err)
    res.status(500).json({messge: "Something went wrong"})
  }
}

const notesService = Object.freeze({
  findNote,
  createNote,
  getAllNotes
})

export default notesService