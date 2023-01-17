const prisma = require("../../../prisma")
const methods = {
    create: null,
    getOne: null,
    getAll: null,
    update: null,
    delete: null,
}

methods.create = async function(title,description){
    const categories = await prisma.categories.create({
        data: {
            title,
        description
    }})

    return categories;
}

methods.getOne = async function(id){
    const isExist = await prisma.categories.findUnique({
        where: {
            id: BigInt(id)
        }
    });

    if(!isExist) return "Category does not found"

    return isExist;
}

module.exports = methods;