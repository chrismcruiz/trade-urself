const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SingUp')
const bcrypt = require('bcrypt')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const users = require('../models/SingUp')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.post('/signup', upload.single('photo'), async (req, response) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)
    const securePassword2 = await bcrypt.hash(req.body.confirm_password, saltPassword)

    const name = req.body.name;
    const email = req.body.email;
    const birthday = req.body.birthday;
    const gender = req.body.gender;
    // const country = req.body.country;
    const career = req.body.career;
    const photo = req.file.filename;
    const password = securePassword;
    const confirm_password = securePassword2;
    
    const newUserData = {
        name,
        email,
        birthday,
        gender,
        // country,
        career,
        photo,
        password,
        confirm_password
    }
   
    // const signedUpUser = new signUpTemplateCopy({
    //     name:request.body.name,
    //     email:request.body.email,
    //     birthday:request.body.birthday,
    //     gender:request.body.gender,
    //     country:request.body.country,
    //     ocupation:request.body.ocupation,
    //     photo:request.file.filename,
    //     password:request.body.password,
    //     confirm_password:request.body.confirm_password
    // })
    const newUser = new users(newUserData);

    newUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})

module.exports = router