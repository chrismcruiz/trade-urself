
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
import Alert from '@material-ui/lab/Alert';


export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  
  const [newUser, setNewUser] = useState(
    {
      name: '',
      email: '',
      birthday: '',
      gender: '',
      country: '',
      ocupation: '',
      password: '',
      confirm_password: ''
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const registered = {
      name: newUser.name,
      email: newUser.email,
      birthday: newUser.birthday,
      gender: newUser.gender,
      country: newUser.country,
      ocupation: newUser.ocupation,
      password: newUser.password,
      confirm_password: newUser.confirm_password
    }


    axios.post('http://localhost:4000/app/signup/', registered)
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          <Alert severity="success">¡Registro Exitoso!</Alert>
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

  // const handlePhoto = (e) => {
  //   setNewUser({ ...newUser, photo: e.target.files[0] });
  // }

  return (
    <BoxContainer>
      <form method='POST' onSubmit={handleSubmit} encType='application/json' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
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
          <label className='label_inputs py-2 ps-2 d-block' style={{ fontWeight: '700' }}>Ocupación</label>
          <select
            required
            name='ocupation'
            id='ocupation'
            className='input_select p-1 w-100'
            value={newUser.ocupation}
            onChange={handleChange}
          >
            <option value='' defaultValue disabled>Escoge una opción</option>
            <option value='estudiante'>Estudiante</option>
            <option value='egresado'>Egresado</option>
            <option value='profesor'>Profesor</option>
          </select>
        </div>
        <div className=''>
          <label className='label_inputs py-2 ps-2' style={{ fontWeight: '700' }}>Subir imagen</label>
          <Input
            className='label_inputs border-0 ps-2'
            type="file"
            name='photo'
            accept=".png, .jpg, .jpeg"
            id='image'
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
        <SubmitButton className='mt-3' type="submit" value='submit'>Registrarme</SubmitButton>
      </form>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        ¿Ya tienes una cuenta?
        <BoldLink href="#" onClick={switchToSignin}>
          Inicia sesión
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}


