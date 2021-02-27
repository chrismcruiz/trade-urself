import React from 'react'
import {
    Input,
    SubmitButton,
} from "./accountBox/common";
import {filtrarUser, recorrerObjeto} from '../utils/Utils'


const editProfile = (props) => {
    const img = recorrerObjeto(filtrarUser(props.props.users, props.props.idUser)).photo
    return (
        <div>
            <div className='fondo-blanco pantalla_match px-4'>
                <div className='div_imagen_edit_perfil'>
                    <img className='imagen_persona_perfil' src={`/images/${img}`} />
                </div>
            </div>
            <form method='POST' className='mt-0 ml-2' encType='multipart/form-data' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className=''>
                    <label className='label_inputs py-2 ps-2' style={{ fontWeight: '700' }}>Cambiar imagen</label>
                    <Input
                        className='label_inputs border-0 ps-2 pl-0'
                        type="file"
                        name='photo'
                        accept=".png, .jpg, .jpeg"
                        id='photo'
                        required
                    />
                </div>

                <Input
                    className='mb-2'
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={''}
                    required
                />
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={''}
                    required
                />
                <div className=''>
                    <label className='label_inputs py-2 ps-2' style={{ fontWeight: '700' }}>Fecha de nacimiento</label>
                    <Input
                        className='label_inputs'
                        type="date"
                        name="birthday"
                        placeholder="Fecha de nacimiento"
                        value={''}
                        required
                    />
                </div>
                <label className='label_inputs mt-2 ps-2' style={{ fontWeight: '700' }}>Género</label>
                <div
                    className='d-flex ps-2'
                    value={''}>
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
                        value={''}
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
                    className='mb-2'
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={''}
                />
                <SubmitButton className='mt-3' type="submit" value='submit'>Guardar</SubmitButton>
            </form>
        </div>
    )
}

export default editProfile
