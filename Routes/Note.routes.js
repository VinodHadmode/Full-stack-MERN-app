const express = require("express")
const { NoteModel } = require("../Model/Note.model")

const noteRouter = express.Router()

noteRouter.post("/create", async (req, res) => {
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.status(200).send({ msg: "new note added" })
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

noteRouter.get("/", async (req, res) => {
    try {
        const allNotes = await NoteModel.find({ authorID: req.body.authorID })
        res.send(allNotes)
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

noteRouter.patch("/update/:noteID", async (req, res) => {
    const { noteID } = req.params
    const note = await NoteModel.findOne({ _id: noteID })
    try {
        if (req.body.authorID != note.authorID) {
            res.status(200).send({ msg: "you are not authorized to this action" })
        } else {
            await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body)
            res.status(200).send({ msg: "note updated" })
        }

    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

noteRouter.delete("/delete/:noteID", async (req, res) => {
    const { noteID } = req.params
    const note = await NoteModel.findOne({ _id: noteID })

    try {
        if (req.body.authorID !== note.authorID) {
            res.status(200).send({ msg: "you are not authorized to this action" })
        } else {
            await NoteModel.findByIdAndDelete({ _id: noteID })
            res.status(200).send({ msg: "note deleted" })
        }

    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})


module.exports = {
    noteRouter
}