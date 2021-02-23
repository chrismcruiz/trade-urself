
import React, { useContext, useState, useEffect } from "react";
import {
  BoldLink,
  BoxContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import axios from 'axios';
import { Button, Modal, Alert } from 'react-bootstrap';
import index from './index'

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);


  const [newUser, setNewUser] = useState(
    {
      name: '',
      email: '',
      birthday: '',
      gender: '',
      career: '',
      photo: '',
      password: '',
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('photo', newUser.photo)
    formData.append('name', newUser.name)
    formData.append('email', newUser.email)
    formData.append('birthday', newUser.birthday)
    formData.append('gender', newUser.gender)
    formData.append('career', newUser.career)
    formData.append('password', newUser.password)

    axios.post('http://localhost:4000/app/signup/', formData)
      .then(response => {
        console.log(response.data);
        if (response.status === 200 && response.data.success) {
          handleShow2()
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  const handlePhoto = (e) => {
    setNewUser({ ...newUser, photo: e.target.files[0] });
  }

  let confirmP;
  const limpiar = React.createRef();

  const handleChangeP = (e) => {
    confirmP = e.target.value
   
  }  
  const handlePass = (e) => {

    let pass = newUser.password
    if (pass !== confirmP) {
      e.preventDefault()
      handleShow()
      limpiar.current.value = ''
    }
  }

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => {
    setShow2(false);
    switchToSignin()
  }

  const handleShow2 = () => setShow2(true);

  return (
    <BoxContainer>
      <Button className='d-none' variant="primary" onClick={handleShow}>
      </Button>
      <Modal show={show} onHide={handleClose} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title className='alert alert-danger w-100 text-white bg-danger m-0' role='alert'>¡Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Contraseñas no coinciden, por favor escribirlas correctamente</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Button className='d-none' variant="success" onClick={handleShow2}>
      </Button>
      <Modal show={show2} onHide={handleClose2} aria-labelledby="contained-modal-title-vcenter" centered animation={true}>
        <Modal.Header>
          <Modal.Title className='alert alert-success w-100 text-white bg-success' role='alert'>¡Correcto!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Registro realizado satisfactoriamente</Modal.Body>
        <Modal.Footer>
          <Button variant="success" className="text-white bg-success" onClick={handleClose2}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <form method='POST' onSubmit={handleSubmit} encType='multipart/form-data' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Input
          className='mb-2'
          type="text"
          placeholder="Nombre"
          name='name'
          value={newUser.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name='email'
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
          required
        />
        <div className=''>
          <label className='label_inputs py-2 ps-2' style={{ fontWeight: '700' }}>Fecha de nacimiento</label>
          <Input
            className='label_inputs'
            type="date"
            placeholder="Fecha de nacimiento"
            required
            name='birthday'
            value={newUser.birthday}
            onChange={handleChange}
          />
        </div>
        <label className='label_inputs mt-2 ps-2' style={{ fontWeight: '700' }}>Género</label>
        <div className='d-flex ps-2' value={newUser.gender} onChange={handleChange}>
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
            className='input_select p-1 w-100'
            value={newUser.career}
            onChange={handleChange}
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
            onChange={handlePhoto}
          />
        </div>
        <Input
          className='mb-2'
          type="password"
          name="password"
          placeholder="Contraseña"
          value={newUser.password}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="confirm_password"
          placeholder="Confirmar Contraseña"
          value={confirmP}
          ref={limpiar}
          onChange={handleChangeP}
          required
        />
        <SubmitButton className='mt-3' type="submit" value='submit'  onClick={handlePass}>Registrarme</SubmitButton>
      </form>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#" className='a_hover_form_login_registro'>
        ¿Ya tienes una cuenta?
        <BoldLink className='a_hover_registrarse' href="#" onClick={switchToSignin}>
          Inicia sesión
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}


