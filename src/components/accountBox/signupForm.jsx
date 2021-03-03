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
import { Button, Modal, Alert } from 'react-bootstrap';

export function SignupForm(props) {
  props = props.props.props;
  //console.log(props.onSignUp)
  const { switchToSignin } = useContext(AccountContext);

  let confirmP;
  const limpiar = React.createRef();

  const handleChangeP = (e) => {
    confirmP = e.target.value

  }
  // const handlePass = (e) => {
  //   let pass = props.signUpPassword
  //   if (pass !== confirmP) {
  //     e.preventDefault()
  //     handleShow()
  //     limpiar.current.value = ''
  //   }
  // }

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    switchToSignin()
  }
  return (
    <BoxContainer>
      {
        (props.signUpError) ? (
          <p>{props.signUpError}</p>
        ) : (null)
      }
      {/* <Button className='d-none' variant="primary" onClick={handleShow}>
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
      </Modal> */}

      {/* <Button className='d-none' variant="success">
      </Button> */}
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
      <form method='POST' encType='multipart/form-data' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Input
          className='mb-2'
          type="text"
          name="name"
          placeholder="Nombre"
          value={props.signUpName}
          onChange={props.onTextboxChangeSignUpName}
          
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={props.signUpEmail}
          onChange={props.onTextboxChangeSignUpEmail}
          
        />
        <div className=''>
          <label className='label_inputs py-2 ps-2' style={{ fontWeight: '700' }}>Fecha de nacimiento</label>
          <Input
            className='label_inputs'
            type="date"
            name="birthday"
            placeholder="Fecha de nacimiento"
            value={props.signUpBirthday}
            onChange={props.onTextboxChangeSignUpBirthday}
            
          />
        </div>
        <label className='label_inputs mt-2 ps-2' style={{ fontWeight: '700' }}>Género</label>
        <div
          className='d-flex ps-2'
          value={props.signUpGender}
          onChange={props.onTextboxChangeSignUpGender}>
          <div className='d-flex align-items-center'>
            <Input
              className='d-inline-block inputs_radius mr-2'
              type="radio"
              name='gender'
              id='male'
              value={'masculino'}
               />
            <label htmlFor="male" className='label_inputs mr-3 mt-1 pt-1'>Masculino</label>
          </div>
          <div className='d-flex align-items-center'>
            <Input
              className='d-inline-block inputs_radius mr-2'
              type="radio"
              name='gender'
              id='female'
              value={'femenino'}
               />
            <label htmlFor="female" className='label_inputs mr-3 mt-1 pt-1'>Femenino</label>
          </div>
          <div className='d-flex align-items-center'>
            <Input
              className='d-inline-block inputs_radius mr-2'
              type="radio"
              name='gender'
              id='other'
              value={'otro'}
               />
            <label htmlFor="other" className='label_inputs mr-3 mt-1 pt-1'>Otro</label>
          </div>
        </div>
        <div className='pb-2'>
          <label className='label_inputs py-2 ps-2 d-block' style={{ fontWeight: '700' }}>Carrera</label>
          <select
            
            name='career'
            id='career'
            value={props.signUpCareer}
            onChange={props.onTextboxChangeSignUpCareer}
          >
            <option value='' defaultValue disabled>Escoge una opción</option>
            <option value='Ingeniería de Sistemas'>Ingeniería de Sistemas</option>
            <option value='Ingeniería Industrial'>Ingeniería Industrial</option>
            <option value='Ingeniería de Petróleos'>Ingeniería de Petróleos</option>
            <option value='Ingeniería Civil'>Ingeniería Civil</option>
            <option value='Ingeniería Metalúrgica'>Ingeniería Metalúrgica</option>
            <option value='Ingeniería Electrónica'>Ingeniería Electrónica</option>
            <option value='Iicenciatura en Idiomas'>Licenciatura en Idiomas</option>
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
            onChange={props.onPhotoChangeSignUpPhoto}
            
          />
        </div>
        <Input
          className='mb-2'
          type="password"
          name="password"
          placeholder="Contraseña"
          value={props.signUpPassword}
          onChange={props.onTextboxChangeSignUpPassword}
        />
        <Input
          type="password"
          name="confirm_password"
          placeholder="Confirmar Contraseña"
          value={confirmP}
          ref={limpiar}
          // onChange={handleChangeP}
          
        />
        <SubmitButton className='mt-3' onClick={props.onSignUp}>Registrarme</SubmitButton>
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
