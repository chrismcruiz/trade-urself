
import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { countries } from '../../countries'
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';


export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  
  const [newUser, setNewUser] = useState(
    {
      name: '',
      email: '',
      birthday: '',
      gender: '',
      country: '',
      career: '',
      photo:'',
      password: '',
      confirm_password: '',
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
    formData.append('country', newUser.country)
    formData.append('career', newUser.career)
    formData.append('password', newUser.password)
    formData.append('confirm_password', newUser.confirm_password)
    // const registered = {
    //   name: newUser.name,
    //   email: newUser.email,
    //   birthday: newUser.birthday,
    //   gender: newUser.gender,
    //   country: newUser.country,
    //   ocupation: newUser.ocupation,
    //   photo: newUser.photo,
    //   password: newUser.password,
    //   confirm_password: newUser.confirm_password
    // }

    axios.post('http://localhost:4000/app/signup/', formData)
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          console.log(response);
          switchToSignin()
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

  const handlePass = (e) =>{
    let pass = newUser.password
    let confirmPass = newUser.confirm_password
    if(pass !== confirmPass){
      e.preventDefault()
      handleShow()
      setNewUser({ ...newUser, confirm_password: '' });
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <BoxContainer>
      <Button className='d-none' variant="primary" onClick={handleShow}>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Contraseñas no coinciden, por favor escribirla correctamente</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
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
        <label className='label_inputs py-2 ps-2' style={{ fontWeight: '700' }}>Género</label>
        <div className='d-flex ps-2' value={newUser.gender} onChange={handleChange}>
          <div className='d-flex align-items-center me-3'>
            <Input
              className='d-inline-block inputs_radius'
              type="radio"
              name='gender'
              id='male'
              value={'masculino'}
              required />
            <label htmlFor="male" className='label_inputs'>Masculino</label>
          </div>
          <div className='d-flex align-items-center me-3'>
            <Input
              className='d-inline-block inputs_radius'
              type="radio"
              name='gender'
              id='female'
              value={'femenino'}
              required />
            <label htmlFor="female" className='label_inputs'>Femenino</label>
          </div>
          <div className='d-flex align-items-center'>
            <Input
              className='d-inline-block inputs_radius'
              type="radio"
              name='gender'
              id='other'
              value={'otro'}
              required />
            <label htmlFor="other" className='label_inputs'>Otro</label>
          </div>
        </div>
        <div className='pb-2'>
          <label className='label_inputs py-2 ps-2 d-block' style={{ fontWeight: '700' }}>País</label>
          <select
            required
            name='country'
            id='country'
            className='input_select p-1 w-100'
            value={newUser.country}
            onChange={handleChange}
          >
            <option value='' defaultValue disabled>Escoge una opción</option>
            {countries.map((country) => (
              <option
                key={country.id}
                value={country.name.toLowerCase().toString()}
              >{country.name}</option>
            ))}
          </select>
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
            className='label_inputs border-0 ps-2'
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
          value={newUser.confirm_password}
          onChange={handleChange}
          required
        />
        <SubmitButton className='mt-3' type="submit" value='submit' onClick={handlePass}>Registrarme</SubmitButton>
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


