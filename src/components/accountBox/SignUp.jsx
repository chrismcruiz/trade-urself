
import React, { useContext, useState } from "react";
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


export function SignUp(props) {

    const { switchToSignin } = useContext(AccountContext);

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => {
        setShow2(false);
        switchToSignin()
    }

    const handleShow2 = () => setShow2(true);

    const handleChangeP = (e) => {
        confirmP = e.target.value

    }

    let confirmP;
    const limpiar = React.createRef();

    const handlePass = (e) => {
        let pass = props.signUpPassword
        if (pass !== confirmP) {
            e.preventDefault()
            handleShow()
            limpiar.current.value = ''
        }
    }

    return (
        <div>
            {
                (props.signUpError) ? (
                    <p>{props.signUpError}</p>
                ) : (null)
            }
            <BoxContainer>
                <FormContainer>
                    <Input
                        className='mb-2'
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={props.signUpName}
                        onChange={props.onTextboxChangeSignUpName}
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={props.signUpEmail}
                        onChange={props.onTextboxChangeSignUpEmail}
                        required
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
                            required
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
                            value={props.signUpCareer}
                            onChange={props.onTextboxChangeSignUpCareer}
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
                            onChange={props.onPhotoChangeSignUpPhoto}
                            required
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
                        onChange={handleChangeP}
                        required
                    />
                </FormContainer>
                <Marginer direction="vertical" margin={10} />
                <SubmitButton className='mt-3' type="submit" value='submit' onClick={props.onSignUp}>Signup</SubmitButton>
                <Marginer direction="vertical" margin="1em" />
                <MutedLink href="#">
                    Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
                        Signin
        </BoldLink>
                </MutedLink>
            </BoxContainer>
        </div>
    )
}