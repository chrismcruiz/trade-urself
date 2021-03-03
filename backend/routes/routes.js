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
                id_user: user._id,
                matches: user.matches
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

    users.findOneAndUpdate({
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

router.post('/liked', (req, res, next) => {

    const { body } = req;
    const { idUser, idPersonLiked } = body;

    users.updateOne({
        _id: idUser,
    }, {
      $addToSet: {
          liked: idPersonLiked
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

router.post('/setmatch', (req, res, next) => {

    const { body } = req;
    const { idUser, idPersonLiked } = body;

    users.updateOne({
        _id: idUser,
    }, {
      $addToSet: {
          matches: idPersonLiked
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

router.delete('/deleteusers', (req, res, next) => {

    users.deleteMany({}, null, (err, sessions) => {
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

router.delete('/deletesessions', (req, res, next) => {

    UserSession.deleteMany({}, null, (err, sessions) => {
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

router.post('/users/match', (req, res) => { // downloading data from our database
    
    const { body } = req;
    const { _id } = body;

    users.find({
        _id: { $in: _id } 
    },(err, data) => {
        if (err){ 
            res.status(500).send(err) // 500 means 'internal server error'
        } else {
            var aMatches = data[0].matches;
            aMatches.shift();
            res.status(200).send(aMatches)
        }
    })
})

router.post('/matches', (req, res) => { // downloading data from our database
    
    const { body } = req;
    const { matches } = body;

    users.find({
        _id: { $in: matches } 
    },(err, data) => {
        if (err){ 
            res.status(500).send(err) // 500 means 'internal server error'
        } else {  
            res.status(200).send(data)
        }
    })
})

router.post('/getInfo', (req, res) => { // downloading data from our database
    
    const { body } = req;
    const { _id } = body;

    users.find({
        _id: { $in: _id } 
    },(err, data) => {
        if (err){ 
            res.status(500).send(err) // 500 means 'internal server error'
        } else {  
            res.status(200).send(data)
        }
    })
})

router.put('/update', upload.single('photo'), async (req, res) => { // downloading data from our database
    
    const { body, file } = req;
    const {
        _id,
        name,
        birthday,
        description,
        career,
        photo,
    } = body;

    let {
        email
    } = body;


    let photoxd = ''

    if (file === undefined) {
        photoxd = photo
    } else {
        photoxd = file.filename;
    }


    email = email.toLowerCase();

    users.updateOne({
        _id: _id 
    }, {
        $set: {
            name: name,
            birthday: birthday,
            description: description,
            career: career,
            photo: photoxd
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

router.delete('/admin/deleteuser', (req, res, next) => {

    const { body } = req
    const { _id } = body
    users.deleteOne({
        _id: _id
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

module.exports = router
