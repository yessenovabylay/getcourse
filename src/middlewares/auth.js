const { user } = require('../../prisma');
const prisma = require('../../prisma');
const jwt = require("jsonwebtoken");
const config = require("../config/config.json")

const isAuth = async (req, res, next) => {
	try{
	const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers.authorization;
	if (token) {
		jwt.verify(token, config.secret_key, (err, decoded) => {
			if (err) {
				console.error(err);
				throw new Error('Invlid token');
			}
			req.user = {};
			req.user.id = decoded.id;
			
		});
		next();
		return
	}
	return res.status(400).json({ success: false, data: "Token does not exist" });
}
	catch(e){
		return res.status(400).json({ success: false, data: "Auth error" });
	}
};

const isUser = async (req,res,next) => {
	const user = await prisma.User.findUnique({
		where: {
			id: BigInt(req.user.id)
		}
	})

	if(user.phoneNumberConfirmation) {
		return next();
	}

	return res.json({ success: false, data: "Permission denied!"});
};


module.exports = { isAuth };