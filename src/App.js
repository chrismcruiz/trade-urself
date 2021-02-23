import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css'
import Home from "./pages/Home"
// import styled from "styled-components";
import 'whatwg-fetch'
import {
    getFromStorage,
    setInStorage,
} from './utils/storage'
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios'

<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpName: '',
      signUpEmail: '',
      signUpGender: '',
      signUpCareer: '',
      signUpBirthday: '',
      signUpPassword: '',
      signUpPhoto: '',
    }
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this)
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this)
    this.onTextboxChangeSignUpName = this.onTextboxChangeSignUpName.bind(this)
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this)
    this.onTextboxChangeSignUpBirthday = this.onTextboxChangeSignUpBirthday.bind(this)
    this.onTextboxChangeSignUpGender = this.onTextboxChangeSignUpGender.bind(this)
    this.onTextboxChangeSignUpCareer = this.onTextboxChangeSignUpCareer.bind(this)
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this)
    this.onPhotoChangeSignUpPhoto = this.onPhotoChangeSignUpPhoto.bind(this)
    this.onSignIn = this.onSignIn.bind(this)
    this.onSignUp = this.onSignUp.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app')
    if (obj && obj.token) {
      const { token } = obj;
      // verify token
      fetch('http://localhost:4000/app/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            })
          } else {
            this.setState({
              isLoading: false
            })
          }
        })
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }

  onTextboxChangeSignInEmail(e) {
    this.setState({
      signInEmail: e.target.value,
    })
  }

  onTextboxChangeSignInPassword(e) {
    this.setState({
      signInPassword: e.target.value,
    })
  }

  onTextboxChangeSignUpName(e) {
    this.setState({
      signUpName: e.target.value,
    })
  }

  onTextboxChangeSignUpEmail(e) {
    this.setState({
      signUpEmail: e.target.value,
    })
  }

  onTextboxChangeSignUpBirthday(e) {
    this.setState({
      signUpBirthday: e.target.value,
    })
  }

  onTextboxChangeSignUpGender(e) {
    this.setState({
      signUpGender: e.target.value,
    })
  }

  onTextboxChangeSignUpCareer(e) {
    this.setState({
      signUpCareer: e.target.value,
    })
  }
  onTextboxChangeSignUpPassword(e) {
    this.setState({
      signUpPassword: e.target.value,
    })
  }

  onPhotoChangeSignUpPhoto(e) {
    this.setState({
      signUpPhoto: e.target.files[0],
    })
  }

  onSignUp(e) {
    e.preventDefault();
    const {
      signUpName,
      signUpEmail,
      signUpBirthday,
      signUpGender,
      signUpCareer,
      signUpPhoto,
      signUpPassword
    } = this.state

    this.setState({
      isLoading: true
    })

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
          this.setState({
            signUpError: response.message,
            isLoading: false,
            signUpName: '',
            signUpEmail: '',
            signUpGender: '',
            signUpCareer: '',
            signUpBirthday: '',
            signUpPassword: '',
            signUpPhoto: '',
          })
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          signUpError: error,
          isLoading: false,
        })
      });
  }

  onSignIn(e) {
    const {
      signInEmail,
      signInPassword
    } = this.state

    this.setState({
      isLoading: true
    })

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
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
            token: json.token,
          })
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          })
        }
      })
  }

  logOut(e) {
    this.setState({
      isLoading: true,
    })
    const obj = getFromStorage('the_main_app')
    if (obj && obj.token) {
      const { token } = obj;
      // verify token
      fetch('http://localhost:4000/app/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            })
          } else {
            this.setState({
              isLoading: false
            })
          }
        })

    } else {
      this.setState({
        isLoading: false,
      })
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signUpError,
      signInEmail,
      signInPassword,
      signUpName,
      signUpEmail,
      signUpGender,
      signUpCareer,
      signUpBirthday,
      signUpPassword,
      // signUpPhoto,
    } = this.state;

    if (isLoading) {
      return (<div><p>Cargando...</p></div>)
    }

    if (!token) {
      return (
        <div>
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <p>Iniciar Sesión</p>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={signInEmail}
                onChange={this.onTextboxChangeSignInEmail}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={signInPassword}
                onChange={this.onTextboxChangeSignInPassword}
              />
            </div>
            <button onClick={this.onSignIn}>Entrar</button>
          </div>
          <br />
          <br />
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <p>Registro</p>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={signUpName}
                onChange={this.onTextboxChangeSignUpName}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={signUpEmail}
                onChange={this.onTextboxChangeSignUpEmail}
              />
            </div>
            <div>
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                name="birthday"
                placeholder="Fecha de nacimiento"
                value={signUpBirthday}
                onChange={this.onTextboxChangeSignUpBirthday}
              />
            </div>
            <div>
              <label>Género</label>
              <div
                value={signUpGender}
                onChange={this.onTextboxChangeSignUpGender}
              >
                <div>
                  <input
                    type="radio"
                    name='gender'
                    id='male'
                    value={'masculino'}
                    required />
                  <label htmlFor='male'>Masculino</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name='gender'
                    id='female'
                    value={'femenino'}
                    required />
                  <label htmlFor='female'>Femenino</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name='gender'
                    id='other'
                    value={'otro'}
                    required />
                  <label htmlFor='other'>Otro</label>
                </div>
              </div>
            </div>

            <div>
              <label>Carrera</label>
              <select
                required
                name='career'
                id='career'
                value={signUpCareer}
                onChange={this.onTextboxChangeSignUpCareer}
              >
                <option value='' selected disabled>Escoge una opción</option>
                <option value='ingenieria de sistemas'>Ingeniería de Sistemas</option>
                <option value='ingenieria industrial'>Ingeniería Industrial</option>
                <option value='ingenieria de petroleos'>Ingeniería de Petroleos</option>
                <option value='ingenieria civil'>Ingeniería Civil</option>
                <option value='ingenieria metalurgica'>Ingeniería Metalúrgica</option>
                <option value='ingenieria electronica'>Ingeniería Electrónica</option>
                <option value='licenciatura en idiomas'>Licenciatura en Idiomas</option>
              </select>
            </div>
            <div>
              <label>Subir imagen</label>
              <input
                type="file"
                name='photo'
                accept=".png, .jpg, .jpeg"
                id='photo'
                onChange={this.onPhotoChangeSignUpPhoto}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={signUpPassword}
                onChange={this.onTextboxChangeSignUpPassword}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Repetir Contraseña"
              />
            </div>
            <div>
              <button onClick={this.onSignUp}>Registrarme</button>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Home />
        <div className="d-flex justify-content-center">
          <button className="mb-5" onClick={this.logOut}>Salir</button>
        </div>
      </div>
    )
  }
}
export default App
