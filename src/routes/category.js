const express = require("express");
const router = express.Router();
const CategoryController = require('../controllers/category');
const { isAuth } = require('../middlewares/auth')
const parseFiles = require('../middlewares/upload-files')
const dateHelp = require("../utils/Date")
const Response = require("../utils/Response")

router

.post("/",isAuth, upload.array("lessonImg",3), async(req, res) => {
    try{
        let { title,shortTitle,description,secondDescription } = req.body;
        const { parseFiles } = req;

        const createCategory = await CategoryController.create(
            {title,shortTitle,description,secondDescription,parseFiles}
            )
        return res.json(new Response().data(createCategory));
        }catch(err)
        {
            return res.status(500).json(new Response().error(err));
        }
})

.get("/:id", async(req,res) => {
    try{
    const { id } = req.params;
    const getOneCategory = await CategoryController.getOne({id})
    return res.json(new Response().data(getOneCategory));
    }catch(err){
        return res.status(500).json(new Response().error(err));
    }
})

.get("/", async (req, res) => {
    try{
    const getAllCategory = await CategoryController.getAll();
    return res.json(new Response().data(getAllCategory));
    }catch(err){
        return res.status(500).json(new Response().error(err));
    }
})

.put("/:id", isAuth, async (req,res) => {
    try{
    const { id } = req.params;
    const { title,shortTitle,description,secondDescription,parseFiles } = req.body;

    const updateCategory = await CategoryController.update({
        title,shortTitle,description,secondDescription,parseFiles
    })

    return res.json(new Response().data(updateCategory));
    }catch(err){
        return res.status(500).json(new Response().error(err));
    }
})

.delete("/:id", isAuth, async(req,res) => {
    try{
    const { id } = req.params;
    const deleteCategory = CategoryController.delete(id)
    return res.json(new Response().data(deleteCategory));
    }catch(err){
        return res.status(500).json(new Response().error(err));
    }
})
module.exports = router;