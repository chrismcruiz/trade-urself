const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SingUp')
const bcrypt = require('bcrypt')
const users = require('../models/SingUp')

router.post('/signup', (request, response) => {

   
    const signedUpUser = new signUpTemplateCopy({
        name:request.body.name,
        email:request.body.email,
        birthday:request.body.birthday,
        gender:request.body.gender,
        country:request.body.country,
        ocupation:request.body.ocupation,
        password:request.body.password,
        confirm_password:request.body.confirm_password
    })
    const newUser = new users(signedUpUser);

    newUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})

module.exports = router