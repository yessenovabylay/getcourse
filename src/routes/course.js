const express = require("express");
const router = express.Router();
const CourseController = require('../controllers/course');
const { isAuth } = require('../middlewares/auth')
const parseFiles = require('../middlewares/upload-files')
const dateHelp = require("../utils/Date")
const Response = require("../utils/Response")



router

.post("/",isAuth, upload.array("lessonImg",3), async(req, res) => {
    try{
        let { title,description } = req.body;
        const { parseFiles } = req;

        const createCourse = await CourseController.create(
            {title,shortTitle,description,secondDescription,parseFiles}
            )
        return res.json(new Response().data(createCourse));
        }catch(err)
        {
            return res.status(500).json(new Response().error(err));
        }
})

.get("/:id", async(req,res) => {
    try{
    const { id } = req.params;
    const getOneCourse = await CourseController.getOne({id})
    return res.json(new Response().data(getOneCourse));
    }catch(err){
        return res.status(500).json(new Response().error(err));
    }
})

.get("/", async (req, res) => {
    try{
    const getAllCourse = await CourseController.getAll();
    return res.json(new Response().data(getAllCourse));
    }catch(err){
        return res.status(500).json(new Response().error(err));
    }
})

.put("/:id", isAuth, async (req,res) => {
    try{
    const { id } = req.params;
    const { title,shortTitle,description,secondDescription,parseFiles } = req.body;

    const updateCourse = await CourseController.update({
        title,shortTitle,description,secondDescription,parseFiles
    })

    return res.json(new Response().data(updateCourse));
    }catch(err){
        return res.status(500).json(new Response().error(err));
    }
})

.delete("/:id", isAuth, async(req,res) => {
    try{
    const { id } = req.params;
    const deleteCourse = CourseController.delete(id)
    return res.json(new Response().data(deleteCourse));
    }catch(err){
        return res.status(500).json(new Response().error(err));
    }
})
module.exports = router;