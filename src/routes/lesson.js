const express = require("express");
const router = express.Router();
const LessonController = require('../controllers/lesson');
const { isAuth } = require('../middlewares/auth')
const parseFiles = require('../middlewares/upload-files')
const dateHelp = require("../utils/Date")
const Response = require("../utils/Response")

router

.post("/",isAuth, upload.array("lessonImg",3), async(req, res) => {
        try{
            let { title,shortTitle,description,secondDescription } = req.body;
            const { parseFiles } = req;

            const createLesson = await LessonController.create(
                {title,shortTitle,description,secondDescription,parseFiles}
                )
            return res.json(new Response().data(createLesson));
        }catch(err)
        {
            return res.status(500).json(new Response().error(err));
        }
})

.get("/:id", async(req,res) => {
    try{
    const { id } = req.params;
    const getOneLesson = await LessonController.getOne({id})
    return res.json(new Response().data(getOneLesson));
    }catch(err){
        return res.status(500).json(new Response().error(err));
    }
})

.get("/", async (req, res) => {
    try{
    const getAllLessons = await LessonController.getAll();
    return res.json(new Response().data(getAllLessons));
    }catch(err){
        return res.status(500).json(new Response().error(err));
    }
})

.put("/:id", isAuth, async (req,res) => {
    try{
    const { id } = req.params;
    const { title,shortTitle,description,secondDescription,parseFiles } = req.body;

    const updateLesson = await LessonController.update({
        title,shortTitle,description,secondDescription,parseFiles
    })

    return res.json(new Response().data(updateLesson));
    }catch(err){
        return res.status(500).json(new Response().error(err));
    }
})

.delete("/:id", isAuth, async(req,res) => {
    try{
    const { id } = req.params;
    const deleteLesson = LessonController.delete(id)
    return res.json(new Response().data(deleteLesson));
    }catch(err){
        return res.status(500).json(new Response().error(err));
    }
})
module.exports = router;