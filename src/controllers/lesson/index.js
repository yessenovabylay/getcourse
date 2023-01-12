const prisma = require("../../../prisma")
const methods = {
    create: null,
    getOne: null,
    getAll: null,
    update: null,
    delete: null,
}

methods.create = async function(bookData, genreIds){
    const { title,
        author,
        isbn,
        description,
        count,
        rating,
        price,
        publishing_date,
        topic} = bookData;
        genreIds = genreIds.map(id => ({genreId: id}) )
    const book = await prisma.book.create({
        data: {
            title,
        author,
        isbn,
        description,
        count,
        rating,
        price,
        publishing_date,
        topic,
            BookGenre: {
                create: genre
            }
        },
        include: {
            BookGenre: true
        }
    })

    let data = bookData.files.map(file => ({link: file.path, bookId: book.id}));
    const resukt = await prisma.imageModel.createMany({
        data
    })
    return book;
}