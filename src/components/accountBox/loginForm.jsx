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


export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <form style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
        <Input className='mb-2' type="email" placeholder="Email" />
        <Input type="password" placeholder="Contraseña" />
        <SubmitButton className='mt-3' type="submit" value='submit'>Entrar</SubmitButton>
      </form>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#" className='a_hover_form_login_registro mt-4'>¿Olvidaste tu contraseña?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#" className='a_hover_form_login_registro'>
        ¿No tienes una cuenta?{" "}
        <BoldLink className='a_hover_registrarse' href="#" onClick={switchToSignup}>
          Registrarse
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
