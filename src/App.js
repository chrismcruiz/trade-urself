import React, { Component, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css'
import Home from "./pages/Home"
import styled from "styled-components";
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

    // const handlePass = (e) => {

    //   let pass = this.newUser.password
    //   let confirmPass = this.newUser.confirm_password
    //   if (pass !== confirmPass) {
    //     e.preventDefault()
    //     handleShow()
    //     //setNewUser({ ...this.newUser, confirm_password: '' });
    //   }
    // }
  
    // const [show, setShow] = useState(false);
    // const [show2, setShow2] = useState(false);
  
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
  
    // const handleClose2 = () => {
    //   setShow2(false);
    // }
  
    // const handleShow2 = () => setShow2(true);


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
            <div className='div_contenedor_login d-flex justify-content-center'>
              <BoxContainer1>
              <TopContainer>
              <BackDrop></BackDrop>
              <HeaderContainer>
                <HeaderText>Bienvenido</HeaderText>
                <SmallText>Por favor, inicia sesión para continuar</SmallText>
              </HeaderContainer>
              </TopContainer> 
              <InnerContainer>
              <BoxContainer>
                <form style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                  <Input 
                  className='mb-2' 
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={signInEmail}
                  onChange={this.onTextboxChangeSignInEmail} />
                  <Input 
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={signInPassword}
                  onChange={this.onTextboxChangeSignInPassword} />
                  <SubmitButton className='mt-3' onClick={this.onSignIn}>Entrar</SubmitButton>
                </form>
                <Marginer direction="vertical" margin={10} />
                <MutedLink href="#" className='a_hover_form_login_registro mt-4'>¿Olvidaste tu contraseña?</MutedLink>
                <Marginer direction="vertical" margin="1.6em" />
                <Marginer direction="vertical" margin="1em" />
                <MutedLink href="#" className='a_hover_form_login_registro'>
                  ¿No tienes una cuenta?{" "}
                  <BoldLink className='a_hover_registrarse' href="#" onClick={this.mostrarDiv}>
                    Registrarse
                  </BoldLink>
                </MutedLink>
              </BoxContainer>
              </InnerContainer>
              </BoxContainer1>  
            </div>
          </div>
          <br />
          <br />
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
              <div className='div_contenedor_registro d-flex justify-content-center'>
                <BoxContainer1>
                <TopContainer>
                <BackDrop></BackDrop>
                <HeaderContainer>
                  <HeaderText>Crear cuenta</HeaderText>
                  <SmallText>Por favor, crea una cuenta para continuar</SmallText>
                </HeaderContainer>
                </TopContainer> 
                <InnerContainer>
                <BoxContainer>
                  <Button className='d-none' variant="primary">
                  </Button>
                  <Modal show={this.show} onHide={this.handleClose} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header>
                      <Modal.Title className='alert alert-danger w-100 text-white bg-danger m-0' role='alert'>¡Error!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Contraseñas no coinciden, por favor escribirlas correctamente</Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={this.handleClose}>
                        Cerrar
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Button className='d-none' variant="success" onClick={this.handleShow2}>
                  </Button>
                  <Modal show={this.show2} onHide={this.handleClose2} aria-labelledby="contained-modal-title-vcenter" centered animation={true}>
                    <Modal.Header>
                      <Modal.Title className='alert alert-success w-100 text-white bg-success' role='alert'>¡Correcto!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Registro realizado satisfactoriamente</Modal.Body>
                    <Modal.Footer>
                      <Button variant="success" className="text-white bg-success" onClick={this.handleClose2}>
                        Cerrar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <form method='POST' onSubmit={this.handleSubmit} encType='multipart/form-data' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Input
                      className='mb-2'
                      type="text"
                      name="name"
                      placeholder="Nombre"
                      value={signUpName}
                      onChange={this.onTextboxChangeSignUpName}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={signUpEmail}
                      onChange={this.onTextboxChangeSignUpEmail}
                      required
                    />
                    <div className=''>
                      <label className='label_inputs py-2 ps-2' style={{ fontWeight: '700' }}>Fecha de nacimiento</label>
                      <Input
                        className='label_inputs'
                        type="date"
                        name="birthday"
                        placeholder="Fecha de nacimiento"
                        value={signUpBirthday}
                        onChange={this.onTextboxChangeSignUpBirthday}
                        required
                      />
                    </div>
                    <label className='label_inputs mt-2 ps-2' style={{ fontWeight: '700' }}>Género</label>
                    <div 
                        className='d-flex ps-2' 
                        value={signUpGender}
                        onChange={this.onTextboxChangeSignUpGender}>
                      <div className='d-flex align-items-center'>
                        <Input
                          className='d-inline-block inputs_radius mr-2'
                          type="radio"
                          name='gender'
                          id='male'
                          value={'masculino'}
                          required />
                        <label htmlFor="male" className='label_inputs mr-3 mt-1 pt-1'>Masculino</label>
                      </div>
                      <div className='d-flex align-items-center'>
                        <Input
                          className='d-inline-block inputs_radius mr-2'
                          type="radio"
                          name='gender'
                          id='female'
                          value={'femenino'}
                          required />
                        <label htmlFor="female" className='label_inputs mr-3 mt-1 pt-1'>Femenino</label>
                      </div>
                      <div className='d-flex align-items-center'>
                        <Input
                          className='d-inline-block inputs_radius mr-2'
                          type="radio"
                          name='gender'
                          id='other'
                          value={'otro'}
                          required />
                        <label htmlFor="other" className='label_inputs mr-3 mt-1 pt-1'>Otro</label>
                      </div>
                    </div>
                    <div className='pb-2'>
                      <label className='label_inputs py-2 ps-2 d-block' style={{ fontWeight: '700' }}>Carrera</label>
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
                    <div className=''>
                      <label className='label_inputs py-2 ps-2' style={{ fontWeight: '700' }}>Subir imagen</label>
                      <Input
                        className='label_inputs border-0 ps-2 pl-0'
                        type="file"
                        name='photo'
                        accept=".png, .jpg, .jpeg"
                        id='photo'
                        onChange={this.onPhotoChangeSignUpPhoto}
                        required
                      />
                    </div>
                    <Input
                      className='mb-2'
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      value={signUpPassword}
                      onChange={this.onTextboxChangeSignUpPassword}
                    />
                    <Input
                      type="password"
                      name="confirm_password"
                      placeholder="Confirmar Contraseña"
                      required
                    />
                    <SubmitButton className='mt-3' type="submit" value='submit' onClick={this.onSignUp}>Registrarme</SubmitButton>
                  </form>
                  <Marginer direction="vertical" margin={10} />
                  <Marginer direction="vertical" margin="1em" />
                  <MutedLink href="#" className='a_hover_form_login_registro'>
                    ¿Ya tienes una cuenta?
                    <BoldLink className='a_hover_registrarse' href="#">
                      Inicia sesión
                    </BoldLink>
                  </MutedLink>
                </BoxContainer>
                </InnerContainer>
                </BoxContainer1>  
              </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Home />
        <div className="d-flex justify-content-center fondo-blanco">
          <p className='text-danger font-weight-bold h4 m-0 py-3 boton_salir' onClick={this.logOut}>Cerrar sesion</p>
          {/* <button className="mb-5" onClick={this.logOut}>Salir</button> */}
        </div>
      </div>
    )
  }
}
export default App
