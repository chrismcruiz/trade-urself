  
import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { countries } from '../../countries'

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Nombre" required/>
        <Input type="email" placeholder="Email" required/>
        <div className=''>
          <label className='label_inputs py-2 ps-2'>Fecha de nacimiento</label>
          <Input className='label_inputs' type="date" placeholder="Fecha de nacimiento" required/>
        </div>
        <label className='label_inputs py-2 ps-2'>Género</label>
        <div className='d-flex ps-2'>
          <div className='d-flex align-items-center me-3'>
            <Input className='d-inline-block inputs_radius' type="radio" name='gender' id='male' required/>
            <label htmlFor="male" className='label_inputs'>Masculino</label>
          </div>
          <div className='d-flex align-items-center'>
            <Input className='d-inline-block inputs_radius' type="radio" name='gender' id='female' required/>
            <label htmlFor="female">Femenino</label>
          </div>
        </div>
        <div className='pb-2'>
          <label className='label_inputs py-2 ps-2 d-block'>Pais</label>
          <select required name='country' id='country' className='input_select p-1 w-100'>
            {countries.map((country) => (
              <option value={country.name.toLowerCase}>{country.name}</option>
            ))}
          </select>
        </div>
        <div className='pb-2'>
          <label className='label_inputs py-2 ps-2 d-block'>Ocupación</label>
          <select required name='ocupation' id='ocupation' className='input_select p-1 w-100'>
              <option value='student'>Estudiante</option>
              <option value='worker'>Egresado</option>
              <option value='worker'>Profesor</option>
          </select>
        </div>
        <div className=''>
          <label className='label_inputs py-2 ps-2'>Subir imagen</label>
          <Input className='label_inputs border-0 ps-2' type="file" name='image' id='image' required/>
        </div>
        <Input type="password" placeholder="Contraseña" required/>
        <Input type="password" placeholder="Confirmar Contraseña" required/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Registrarme</SubmitButton>
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
