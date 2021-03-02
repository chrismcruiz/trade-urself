import React, { useState, useEffect } from "react";
import {
    Input,
    SubmitButton,
} from "./accountBox/common";
import {filtrarUser, recorrerObjeto} from '../utils/Utils'
import axios from 'axios'
import { CircularProgress } from '@material-ui/core';

const EditProfile = (props) => {
    props = props.props;
   
    const user = recorrerObjeto(filtrarUser(props.users, props.idUser))
    const img = recorrerObjeto(filtrarUser(props.users, props.idUser)).photo

    const [isLoading, setIsLoading] = useState(false);
    const [editDescription, setEditDescription] = useState(user.description);
    const [editPhoto, setEditPhoto] = useState(img.toString());
    const [editName, setEditName] = useState(user.name);
    const [editEmail, setEditEmail] = useState(user.email);
    const [editBirthday, setEditBirthday] = useState(user.birthday);
    const [editCareer, setEditCareer] = useState(user.career);


    function onTextboxChangeUpdateNombre(e) {
        setEditName(e.target.value)
    }
    function onTextboxChangeUpdateEmail(e) {
        setEditEmail(e.target.value)
    }
    function onTextboxChangeUpdateFecha(e) {
        setEditBirthday(e.target.value)
    }
    function onTextboxChangeUpdateDescription(e) {
        setEditDescription(e.target.value)
    }
    function onTextboxChangeUpdateCarrera(e) {
        setEditCareer(e.target.value)
    }

    const onPhotoChangeUpdatePhoto = (e) => {
        setEditPhoto(e.target.files[0])
    }

    const onEdit = async (e) => {
        // e.preventDefault();
        setIsLoading(true)
        
        const formData = new FormData();

        formData.append('_id', user._id)
        formData.append('photo', editPhoto)
        formData.append('name', editName)
        formData.append('email', editEmail)
        formData.append('birthday', editBirthday)
        formData.append('description', editDescription)
        formData.append('career', editCareer)
       

        await axios.put('http://localhost:4000/app/update/', formData)
            .then(response => {
                console.log(response.data);
                setIsLoading(false)
                window.location.reload()
                
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false)
            });
    }

    if (isLoading) {
        return (<div className="vertical-center"><CircularProgress color="primary" size={60} /></div>)
    }

    return (

        <div className='p-3'>
            <div className='fondo-blanco pantalla_match px-4'>
                <div className='div_imagen_edit_perfil'>
                    <img className='imagen_persona_perfil' src={`/images/${img}`} />
                </div>
            </div>
            <form method='POST' className='' encType='multipart/form-data'>
                <div className="form-group  mb-0">
                    <label htmlFor='description' className='label_inputs py-2 pt-4' style={{ fontWeight: '700' }}>Descripción</label>
                    <textarea
                        rows="3"
                        cols="3"
                        id='description'
                        className='form-control textarea'
                        placeholder='Añade una descripción breve de tí...'
                        value={editDescription}
                        onChange={onTextboxChangeUpdateDescription}
                    ></textarea>
                </div>
                <div className=''>
                    <label className='label_inputs py-2 pt-4' style={{ fontWeight: '700' }}>Cambiar imagen</label>
                    <Input
                        className='label_inputs border-0 ps-2 pl-0'
                        type="file"
                        name='photo'
                        accept=".png, .jpg, .jpeg"
                        id='photo'
                        required
                        onChange={onPhotoChangeUpdatePhoto}
                    />
                </div>

                <Input
                    className='mb-2'
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={editName}
                    onChange={onTextboxChangeUpdateNombre}
                    required
                />
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={editEmail}
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
                        value={editBirthday}
                        onChange={onTextboxChangeUpdateFecha}
                        required
                    />
                </div>
                <div className='pb-2'>
                    <label className='label_inputs py-2 ps-2 d-block' style={{ fontWeight: '700' }}>Carrera</label>
                    <select
                        required
                        name='career'
                        id='career'
                        value={editCareer}
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
                <SubmitButton className='mt-3' type="submit" value='submit' onClick={onEdit} >Guardar</SubmitButton>
            </form>
            <div className="d-flex justify-content-center fondo-blanco pt-4">
                <p className='text-danger font-weight-bold h4 m-0 py-3 boton_salir' onClick={props.logOut} >Cerrar sesion</p>
            </div>
        </div>
    )
}

export default EditProfile
