import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css'
import Home from "./pages/Home"
import 'whatwg-fetch'
import {
  getFromStorage,
  setInStorage,
} from './utils/storage'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios'
import Admin from './pages/Admin'
import { AccountBox } from "./components/accountBox";
import styled from "styled-components";

<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {

  const [users, setUsers] = useState([]);
  const [rol, setRol] = useState('');
  // const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');
  const [idUser, setIdUser] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [signInError, setSignInError] = useState('');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpGender, setSignUpGender] = useState('');
  const [signUpCareer, setSignUpCareer] = useState('');
  const [signUpBirthday, setSignUpBirthday] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpPhoto, setSignUpPhoto] = useState('');

  useEffect(() => {
    const obj = getFromStorage('the_main_app')
    if (obj && obj.token) {
      const { token, idUser } = obj;
      // verify token
      fetch('http://localhost:4000/app/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setToken(token);
            setIdUser(idUser);
            setIsLoading(false);

          } else {
            setIsLoading(false)
          }
        })
    } else {
      setIsLoading(false)
    }

    async function fetchData() {
      const req = await axios.get("http://localhost:4000/app/users");
      const req2 = await axios.get("http://localhost:4000/app/users/sesion");
      setUsers(req.data);
      let id = req2.data
      setIdUser(id[id.length - 1].userId)

    }
    fetchData();

   
  }, [])

  // let objeto = ''
  // const getRol = () => {
  //   const logged = users.filter((user) => user._id === idUser)
  //   for(let i = 0; i < logged.length; i++){
  //     objeto = logged[i]
  //     objeto = objeto.rol
  //   }
  //   return objeto
  // }

  const role = users.filter((user) => user._id === idUser)
  let mirol = ''

  const recorrerObjeto = (obj) => {
    for(let i = 0; i < obj.length; i++){
      mirol = obj[i]
    }
    return mirol
  }
  
   

  const mirolxd = recorrerObjeto(role).rol

  const rolfuncion = (mirolxd) => {
    if (mirolxd === 'usuario') {
      mirolxd = true
    }else {
      mirolxd = false
    }
    return mirolxd
  }

  let esadmin = rolfuncion(mirolxd)

  const onTextboxChangeSignInEmail = (e) => {
    setSignInEmail(e.target.value)
  }

  const onTextboxChangeSignInPassword = (e) => {
    setSignInPassword(e.target.value)
  }

  const onTextboxChangeSignUpName = (e) => {
    setSignUpName(e.target.value)

  }

  const onTextboxChangeSignUpEmail = (e) => {
    setSignUpEmail(e.target.value)
  }

  const onTextboxChangeSignUpBirthday = (e) => {
    setSignUpBirthday(e.target.value)
  }

  const onTextboxChangeSignUpGender = (e) => {
    setSignUpGender(e.target.value)
  }

  const onTextboxChangeSignUpCareer = (e) => {
    setSignUpCareer(e.target.value)

  }
  const onTextboxChangeSignUpPassword = (e) => {
    setSignUpPassword(e.target.value)
  }

  const onPhotoChangeSignUpPhoto = (e) => {
    setSignUpPhoto(e.target.files[0])
  }

  const onSignUp = (e) => {
    e.preventDefault();

    setIsLoading(true)

    const formData = new FormData();

    formData.append('photo', signUpPhoto)
    formData.append('name', signUpName)
    formData.append('email', signUpEmail)
    formData.append('birthday', signUpBirthday)
    formData.append('gender', signUpGender)
    formData.append('career', signUpCareer)
    formData.append('password', signUpPassword)

    axios.post('http://localhost:4000/app/signup/', formData)
      .then(response => {
        console.log(response.data);
        if (response.status === 200 && response.data.success) {
          setSignUpError(response.message)
          setIsLoading(false)
        }
      })
      .catch(error => {
        console.log(error);
        setSignUpError(error)
        setIsLoading(false)
      });
  }

  const onSignIn = (e) => {
    setIsLoading(true)

    fetch('http://localhost:4000/app/signin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage('the_main_app', { token: json.token, idUser: json.id_user })
          setSignInError(json.message)
          setIsLoading(false)
          setSignInEmail('')
          setSignInPassword('')
          setToken(json.token)
          setIdUser(json.id_user)
          window.location = '/home';
        } else {
          setSignUpError(json.message)
          setIsLoading(false)
        }
      })
  }

  const logOut = () => {
    setIsLoading(true)

    const obj = getFromStorage('the_main_app')
    if (obj && obj.token) {
      const { token } = obj;
      // verify token
      fetch('http://localhost:4000/app/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            console.log('sesión cerrada')
            setToken('')
            setIdUser('')
            window.localStorage.clear()
            window.location = '/'
            setIsLoading(false)
          } else {
            setIsLoading(false)
          }
        })
    } else {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (<div><p>Cargando...</p></div>)
  }

  if (!token) {
    return (
      <AppContainer>
        <AccountBox
          props={
            {
              signInError,
              signInEmail,
              signInPassword,
              signUpError,
              signUpName,
              signUpEmail,
              signUpGender,
              signUpCareer,
              signUpBirthday,
              signUpPassword,
              signUpPhoto,
              onSignIn,
              onSignUp,
              onTextboxChangeSignInEmail,
              onTextboxChangeSignInPassword,
              onTextboxChangeSignUpName,
              onTextboxChangeSignUpEmail,
              onTextboxChangeSignUpBirthday,
              onTextboxChangeSignUpGender,
              onTextboxChangeSignUpCareer,
              onTextboxChangeSignUpPassword,
              onPhotoChangeSignUpPhoto
            }
          }
        />
      </AppContainer>
    )
  }
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/home">
            {esadmin ? 
            (
              <Redirect to="/admin" />
            ) : 
            (
            <Home props={{ logOut, token, idUser, users }} />
            )
          
            }
          </Route>
          <Route path="/admin">
            <Admin props={logOut, token} />
          </Route>
          <Route path="/">
            {token ? <Redirect to="/home" /> : null}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
