
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

export function SignIn(props) {

    const { switchToSignup } = useContext(AccountContext);

    return (
    <div>
        {(props.signInError) ? (
              <p>{props.signInError}</p>
            ) : (null)
          }
        <BoxContainer>
            <FormContainer>
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
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <MutedLink href="#">Forget your password?</MutedLink>
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton type="submit" className='mt-3' onClick={props.onSignIn}>Signin</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">
                Don't have an accoun?{" "}
                <BoldLink href="#" onClick={switchToSignup}>
                    Signup
                </BoldLink>
            </MutedLink>
        </BoxContainer>
    </div>
    )
}