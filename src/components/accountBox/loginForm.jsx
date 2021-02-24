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

export function LoginForm(props) {
  props = props.props.props;
  const { switchToSignup } = useContext(AccountContext);
  
  return (
    <BoxContainer>
      {
        (props.signInError) ? (
          <p>{props.signInError}</p>
        ) : (null)
      }
      <form onSubmit={() => props.onSignIn()} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Input
          className='mb-2'
          type="email"
          placeholder="Email"
          name="email"
          value={props.signInEmail}
          onChange={props.onTextboxChangeSignInEmail} />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={props.signInPassword}
          onChange={props.onTextboxChangeSignInPassword} />
        <SubmitButton className='mt-3'>Entrar</SubmitButton>
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