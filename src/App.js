import React, { useContext, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css'
import Home from "./pages/Home"
//import styled from "styled-components";
import 'whatwg-fetch'
import {
  getFromStorage,
  setInStorage,
} from './utils/storage'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios'
import {
  BoldLink,
  BoxContainer,
  Input,
  MutedLink,
  SubmitButton,
  BoxContainer1,
  TopContainer,
  HeaderContainer,
  BackDrop,
  HeaderText,
  SmallText,
  InnerContainer,
  backdropVariants,
  expandingTransition
} from "./components/accountBox/common";
import { Marginer } from "./components/marginer";
import { Button, Modal } from 'react-bootstrap';
import Admin from './pages/Admin'
import { AccountBox } from "./components/accountBox";
import { AccountContext } from "./components/accountBox/accountContext";
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

const App = (props) => {

  // const { switchToSignin } = useContext(AccountContext);

  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');
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
      const { token } = obj;
      // verify token
      fetch('http://localhost:4000/app/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setToken(token);
            setIsLoading(false);

          } else {
            setIsLoading(false)
          }
        })
    } else {
      setIsLoading(false)
    }
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

  const onSignUp = (e) => {
    //alert("a");
    e.preventDefault();
    // const {
    //     signUpName,
    //     signUpEmail,
    //     signUpBirthday,
    //     signUpGender,
    //     signUpCareer,
    //     signUpPhoto,
    //     signUpPassword
    // }

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
          setSignUpName('')
          setSignUpEmail('')
          setSignUpBirthday('')
          setSignUpGender('')
          setSignUpCareer('')
          setSignUpPhoto('')
          setSignUpPassword('')
        }
      })
      .catch(error => {
        console.log(error);
        setSignUpError(error)
        setIsLoading(false)
      });
  }

  const onSignIn = (e) => {
    // const {
    //     signInEmail,
    //     signInPassword
    // }

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
          setInStorage('the_main_app', { token: json.token })
          setSignInError(json.message)
          setIsLoading(false)
          setSignInEmail('')
          setSignInPassword('')
          setToken(json.token)
          window.location.href = '/home';
        } else {
          setSignUpError(json.message)
          setIsLoading(false)
        }
      })
  }

  const logOut = (e) => {
    setIsLoading(true)

    const obj = getFromStorage('the_main_app')
    if (obj && obj.token) {
      const { token } = obj;
      // verify token
      fetch('http://localhost:4000/app/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setToken('')
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
      <div>
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
      </div>
    )
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/home">
            <div>
              <Home />
              <div className="d-flex justify-content-center fondo-blanco">
                <p className='text-danger font-weight-bold h4 m-0 py-3 boton_salir' onClick={logOut}>Cerrar sesion</p>
                {/* <button className="mb-5" onClick={this.logOut}>Salir</button> */}
              </div>
            </div>
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            {/* {token ? (<Home />) : (<App />)} */}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
