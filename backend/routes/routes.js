const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SingUp')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const users = require('../models/SingUp')
const UserSession = require('../models/SignIn')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.post('/signup', upload.single('photo'), async (req, res, next) => {

    const { body, file } = req;
    const {
        name,
        birthday,
        gender,
        career,
        password
    } = body;

    let {
        email
    } = body;

    let photo = file.filename;

    if(!name) {
        return res.send({
            success: false,
            message: 'Error: El nombre no puede ir en blanco.'
        })
    }
    if(!email) {
        return res.send({
            success: false,
            message: 'Error: El email no puede ir en blanco.'
        })
    }
    if(!birthday) {
        return res.send({
            success: false,
            message: 'Error: La fecha de nacimiento no puede ir en blanco.'
        })
    }
    if(!gender) {
        return res.send({
            success: false,
            message: 'Error: El género no puede ir en blanco.'
        })
    }
    if(!career) {
        return res.send({
            success: false,
            message: 'Error: La carrera no puede ir en blanco.'
        })
    }
    if(!password) {
        return res.send({
            success: false,
            message: 'Error: La contraseña no puede ir en blanco.'
        })
    }
    if(!photo) {
        return res.send({
            success: false,
            message: 'Error: La foto no puede ir en blanco.'
        })
    }

    email = email.toLowerCase();

    users.find({
        email: email
    }, (err, previousUsers) => {
        if(err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: La cuenta ya existe'
            })
        }

        const newUser = new users();

        newUser.email = email;
        newUser.name = name;
        newUser.gender = gender;
        newUser.career = career;
        newUser.birthday = birthday;
        newUser.photo = photo;
        newUser.password = newUser.generateHash(password)
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                })
            }
            return res.send({
                success: true,
                message: 'Registro válido'
            })
        })
    })
    // const name = req.body.name;
    // const email = req.body.email;
    // const birthday = req.body.birthday;
    // const gender = req.body.gender;
    // const career = req.body.career;
    // const photo = req.file.filename;
    // const password = req.body.password;
    // const confirm_password = req.body.confirm_password;

    // const newUserData = {
    //     name,
    //     email,
    //     birthday,
    //     gender,
    //     career,
    //     photo,
    //     password,
    //     confirm_password
    // }

    // const newUser = new users(newUserData);

    // newUser.save()
    //     .then(data => {
    //         response.json(data)
    //     })
    //     .catch(error => {
    //         response.json(error)
    //     })
})

router.post('/signin', (req, res, next) => {
    const { body } = req;
    const {
        password
    } = body;

    let {
        email
    } = body

    if(!email) {
        return res.send({
            success: false,
            message: 'Error: El email no puede ir en blanco.'
        })
    }
    if(!password) {
        return res.send({
            success: false,
            message: 'Error: La contraseña no puede ir en blanco.'
        })
    }

    email = email.toLowerCase();

    users.find({
        email: email
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: server error'
            })
        }
        if (users.length != 1){
            return res.send({
                success: false,
                message: 'Error: Invalido'
            })
        }

        const user = users[0]
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalido'
            })
        }

        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                })
            }
            return res.send({
                success: true,
                message: 'Logueo válido',
                token: doc._id
            })
        })
    })
})


module.exports = router