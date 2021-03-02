import React, { useState, useEffect } from "react";
import {
    Input,
    SubmitButton,
} from "./accountBox/common";
import {filtrarUser, recorrerObjeto} from '../utils/Utils'
import axios from 'axios'

const EditProfile = (props) => {
    props = props.props;
    
    const [oUser, setInfoUser] = useState([]);

    useEffect(() => {
        async function getInfo() {
            const req = await axios.post("http://localhost:4000/app/getInfo",{
                _id: props.idUser
            });
            if (req.data) {
                setInfoUser(req.data[0]);
            }
        }
        getInfo()
    }, [])

    const img = recorrerObjeto(filtrarUser(props.users, props.idUser)).photo

    function onTextboxChangeUpdateNombre(e){
        setInfoUser(e.target.value)
    }
    function onTextboxChangeUpdateEmail(e){
        setInfoUser(e.target.value)
    }
    function onTextboxChangeUpdateFecha(e){
        setInfoUser(e.target.value)
    }
    function onTextboxChangeUpdateGenero(e){
        setInfoUser(e.target.value)
    }
    function onTextboxChangeUpdateCarrera(e){
        setInfoUser(e.target.value)
    }
    function onTextboxChangeUpdateContraseña(e){
        setInfoUser(e.target.value)
    }

    return (
        
        <div className='p-3'>
            <div className='fondo-blanco pantalla_match px-4'>
                <div className='div_imagen_edit_perfil'>
                    <img className='imagen_persona_perfil' src={`/images/${img}`} />
                </div>
            </div>
            <form method='POST' className='' encType='multipart/form-data'>
                <div className=''>
                    <label className='label_inputs py-2 pt-4' style={{ fontWeight: '700' }}>Cambiar imagen</label>
                    <Input
                        className='label_inputs border-0 ps-2 pl-0'
                        type="file"
                        name='photo'
                        accept=".png, .jpg, .jpeg"
                        id='photo'
                        required
                        //value={''}
                    />
                </div>

                <Input
                    className='mb-2'
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={oUser.name}
                    onChange={onTextboxChangeUpdateNombre}
                    required
                />
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={oUser.email}
                    onChange={onTextboxChangeUpdateEmail}
                    required
                />
                <div className=''>
                    <label className='label_inputs py-2 ps-2' style={{ fontWeight: '700' }}>Fecha de nacimiento</label>
                    <Input
                        className='label_inputs'
                        type="date"
                        name="birthday"
                        placeholder="Fecha de nacimiento"
                        value={oUser.birthday}
                        onChange={onTextboxChangeUpdateFecha}
                        required
                    />
                </div>
                <label className='label_inputs mt-2 ps-2' style={{ fontWeight: '700' }}>Género</label>
                <div
                    className='d-flex ps-2'
                    value={oUser.gender}
                    onChange={onTextboxChangeUpdateGenero}
                    >
                    <div className='d-flex align-items-center'>
                        <Input
                            className='d-inline-block inputs_radius mr-2'
                            type="radio"
                            name='gender'
                            id='male'
                            value={'Masculino'}
                            required 
                            />
                        <label htmlFor="male" className='label_inputs mr-3 mt-1 pt-1'>Masculino</label>
                    </div>
                    <div className='d-flex align-items-center'>
                        <Input
                            className='d-inline-block inputs_radius mr-2'
                            type="radio"
                            name='gender'
                            id='female'
                            value={'Femenino'}
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
                        value={oUser.career}
                        onChange={onTextboxChangeUpdateCarrera}
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
                <Input
                    className='my-2'
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={oUser.password}
                    onChange={onTextboxChangeUpdateContraseña}
                />
                <SubmitButton className='mt-3' type="submit" value='submit'>Guardar</SubmitButton>
            </form>
            <div className="d-flex justify-content-center fondo-blanco pt-4">
                <p className='text-danger font-weight-bold h4 m-0 py-3 boton_salir' onClick={props.logOut} >Cerrar sesion</p>
            </div>
        </div>
    )
}

export default EditProfile
