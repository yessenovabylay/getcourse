const { body } = require('express-validator');

const registerValidator = [
    body('email', 'Неверный формат почты.').isLength({min:11, max:12}),
    body('password', 'Пароль должен быть минимум 8 символов.').isLength({min:8}),
    body('firstName', 'Укажите имя.').isLength({min:3}),
    body('lastName', 'Укажите фамилию.').isLength({min:3}),
];


module.exports = { registerValidator };
