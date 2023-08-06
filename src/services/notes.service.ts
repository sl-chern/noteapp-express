import { Request, Response } from "express"
import getNotesRepository from "../repositories/notes.repository.js"
import { PrismaClient } from "@prisma/client"
import INote from "../types/INote.js"
import categories from "../data/categories.js"

const prisma = new PrismaClient({
  log: ["query"]
})

const notesRepository = getNotesRepository(prisma.note)

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
    res.status(204).json()
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

const getNotesStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const archivedStats = await notesRepository.getNotesCount(true)
    const notArchivedStats = await notesRepository.getNotesCount(false)

    const result = {}
    categories.forEach((category: string): void => {
      result[category] = {
        archived: archivedStats.find(archivedCategory => archivedCategory.category === category)?._count || 0,
        notArchived: notArchivedStats.find(archivedCategory => archivedCategory.category === category)?._count || 0
      }
    })

    res.status(200).json(result)
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
  updateNote,
  getNotesStats
})

export default notesService