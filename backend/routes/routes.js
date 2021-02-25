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
        cb(null, '../public/images');
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

    if (!name) {
        return res.send({
            success: false,
            message: 'Error: El nombre no puede ir en blanco.'
        })
    }
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: El email no puede ir en blanco.'
        })
    }
    if (!birthday) {
        return res.send({
            success: false,
            message: 'Error: La fecha de nacimiento no puede ir en blanco.'
        })
    }
    if (!gender) {
        return res.send({
            success: false,
            message: 'Error: El género no puede ir en blanco.'
        })
    }
    if (!career) {
        return res.send({
            success: false,
            message: 'Error: La carrera no puede ir en blanco.'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: La contraseña no puede ir en blanco.'
        })
    }
    if (!photo) {
        return res.send({
            success: false,
            message: 'Error: La foto no puede ir en blanco.'
        })
    }

    email = email.toLowerCase();

    users.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
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
})

router.post('/signin', (req, res, next) => {
    const { body } = req;
    const {
        password
    } = body;

    let {
        email
    } = body

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: El email no puede ir en blanco.'
        })
    }
    if (!password) {
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
        if (users.length != 1) {
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
                token: doc._id,
                id_user: user._id
            })
        })
    })
})

router.get('/verify', (req, res, next) => {
    //get the token
    const { query } = req;
    const { token } = query;
    // verify the token of one of a kind and its not deleted

    UserSession.find({
        _id: token,
        isDeleted: false,
    }, (err, sessions) => {
        if (err) {
            return res.send({
                sucess: false,
                message: 'Error: Server error'
            })
        }

        if (sessions.length != 1) {
            return res.send({
                sucess: false,
                message: 'Error: Invalido'
            })
        } else {
            return res.send({
                success: true,
                message: 'Correcto'
            })
        }
    })
})

router.get('/logout', (req, res, next) => {
    //get the token
    const { query } = req;
    const { token } = query;
    // verify the token of one of a kind and its not deleted

    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false,
    }, {
      $set: {
          isDeleted: true
        }
    }, null, (err, sessions) => {
    if (err) {
        return res.send({
            sucess: false,
            message: 'Error: Server error'
        })
    }
    return res.send({
        success: true,
        message: 'Correcto'
        })
    })
})

router.get('/users', (req, res) => { // downloading data from our database
    users.find((err, data) => {
        if (err){ 
            res.status(500).send(err) // 500 means 'internal server error'
        } else {
            res.status(200).send(data) // 200 means 'success'
        }
    })
})

router.get('/users/sesion', (req, res) => { // downloading data from our database
    const sessions = req.body;
    UserSession.find((err, data) => {
        if (err){ 
            res.status(500).send(err) // 500 means 'internal server error'
        } else {
            res.status(200).send(data) // 200 means 'success'
        }
    })
})

router.post('/fav', (req, res, next) => {
    
    const { body } = req;
    const {person, idUser} = body;

    const user = users(); //Filtrar por idUser y obtener el usuario actual

    //se agrega la persona a la que le di match
    user.liked = user.liked.push(person);

    user.save((err) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }

        //Match
        //1) Buscar la persona que le di me gusta - person (person._id)
        //2) Filtrar por su propiedad liked con el idUser
        //3) Si existe pues le agregan el match a las dos user.matxxx = user.matxxx.push(person); && person.matxxx = person.matxxx.push(user);

        return res.send({
            success: true,
            message: 'Registro válido'
        })
    })
})

module.exports = router
