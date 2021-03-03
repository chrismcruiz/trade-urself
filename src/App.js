import React, { useState, useEffect, useContext } from 'react'
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
import { CircularProgress } from '@material-ui/core';
import { filtrarUser, recorrerObjeto } from './utils/Utils'
import { AccountContext } from "./components/accountBox/accountContext";
import { Button, Modal, Alert } from 'react-bootstrap';


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

  const [active, setActive] = useState("signup");

  const switchToSignup = () => {
    setActive("signup");
  };

  const [users, setUsers] = useState([]);
  const [sessions, setSessions] = useState([]);
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
  const [matches, setMatches] = useState([]);

  // const matches = recorrerObjeto(filtrarUser(users, idUser)).matches
  // const arrayMatches = matches.splice(1, 1)
  // console.log(arrayMatches)

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
      setUsers(req.data);
      const req2 = await axios.get("http://localhost:4000/app/users/sesion");
      setSessions(req2.data)
      
    }
    fetchData();
  }, [])


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


  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
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
        if (response.status === 200 && response.data.success) {
          setSignUpError(response.message)
          setIsLoading(false)
          setSignUpName('')
          setSignUpEmail('')
          setSignUpBirthday('')
          setSignUpGender('')
          setSignUpCareer('')
          setSignUpPassword('')
          setShow(true);
        }
      })
      .catch(error => {
        //console.log(error);
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
          setMatches(json.matches)
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
            window.localStorage.clear()
            setToken('')
            setIdUser('')
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

  const admin = recorrerObjeto(filtrarUser(users, idUser)).admin

  if (isLoading) {
    return (<div className="vertical-center"><CircularProgress color="primary" size={60} /></div>)
  }

  if (!token) {
    return (
      <AppContainer>
        <Modal show={show} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header className='m-0 p-0'>
            <Modal.Title className='alert alert-success w-100 text-white bg-success' role='alert'>¡Correcto!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Registro realizado satisfactoriamente</Modal.Body>
          <Modal.Footer>
            <Button variant="success" className="text-white bg-success" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
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
              onPhotoChangeSignUpPhoto,
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
            {admin ? (
              <Redirect to="/admin" />
            ) : (
                <Home props={{ logOut, onSignUp, token, idUser, users }} />
              )}
          </Route>
          <Route path="/admin">
            {admin ? 
              (
                <Admin props={{ logOut, token, idUser, users, isLoading }} />
              )
              :
              (
                <Redirect to="/home" />
              )
            }
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
