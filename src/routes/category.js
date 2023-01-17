const express = require("express");
const router = express.Router();
const CategoryController = require('../controllers/category');
const { isAuth } = require('../middlewares/auth')
const dateHelp = require("../utils/Date")
const Response = require("../utils/Response")

router

.post("/",async(req, res) => {
    try{
        let { title,description } = req.body;

        const createCategory = await CategoryController.create(
            {title,description}
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

module.exports = router;