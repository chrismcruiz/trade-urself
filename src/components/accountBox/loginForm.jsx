import React, { useContext } from "react";
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
      </form>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">¿Olvidaste tu contraseña?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit">Entrar</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        ¿No tienes una cuenta?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Registrarse
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
