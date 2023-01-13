const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user');
const Response = require("../utils/Response")
const { registerValidator } = require("../validators/index")


router.post('/registration',registerValidator ,async (req, res) => {
    try{
    const { email, firstName, lastName,password } = req.body;

    const createUser = await UserController.registration({ email, firstName, lastName, password })
    

    return res.json(new Response().data(createUser));
    }catch(err){
        return res.status(500).json(new Response().error(err));
    }
})

.post('/login', async (req, res) => {
    try{
    const { email, password } = req.body;
    const signin = await UserController.login({email,password})
    return res.json(new Response().data(signin));
    }catch(err){
        return res.status(500).json(new Response().error(err));
    }
})


module.exports = router;