import React, { useState } from "react";
import logo from '../borrar/imagen-1.webp'
import Cards from '../components/Cards'
import {
    Input,
    SubmitButton,
  } from "../components/accountBox/common";
  import CreateIcon from '@material-ui/icons/Create';
  import ArrowBackIcon from '@material-ui/icons/ArrowBack';


function Home() {

    const [perfilShow, setPerfilShow] = useState(true);
    const [perfilBack, setPerfilBack] = useState(false);

    const handlePerfilShow = () => {
        perfilShow ? setPerfilShow(false) : setPerfilShow(false);
    }
    const handlePerfilBack = () => {
        perfilShow ? setPerfilShow(true) : setPerfilShow(true);
    }

  return (
    <div className='contenedor_home'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-3 px-0' style={{width:'19.75%'}}>
                    <div className='menu_arriba w-100'>
                        <div className='py-3 px-4 a_hover_perfil d-flex justify-content-between align-items-center'>
                            <div className='d-flex align-items-center'>
                                <ArrowBackIcon className='mr-2 texto-blanco' onClick={handlePerfilBack}></ArrowBackIcon>
                                <img className='imagen_perfil' src={logo} />                                  
                                <p className='pl-3 m-0 text-titulos-1 texto-blanco'>
                                    Mi perfil
                                </p>
                            </div>
                            <div>
                                <CreateIcon className='m-2 texto-blanco' onClick={handlePerfilShow}></CreateIcon>
                                {/* <ExitToAppIcon className='mr-2 texto-blanco' onClick={handlePerfilBack}></ExitToAppIcon> */}
                            </div>                        
                        </div>
                    </div>
                    {perfilShow ? <div className='fondo-blanco pantalla_match p-2'>
                        <div className='div_personas_matches' style={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-evenly'}}>
                            <div className='div_imagen_personas_matches position-relative m-2 d-inline-block'>
                                <img className='imagen_personas_matches' src={logo} />
                                <label className='position-absolute label_nombre_matches texto-blanco fw-bold'>Hordan</label>
                            </div>
                            <div className='div_imagen_personas_matches position-relative m-2 d-inline-block'>
                                <img className='imagen_personas_matches' src={logo} />
                                <label className='position-absolute label_nombre_matches texto-blanco fw-bold'>Hordan</label>
                            </div>
                            <div className='div_imagen_personas_matches position-relative m-2 d-inline-block'>
                                <img className='imagen_personas_matches' src={logo} />
                                <label className='position-absolute label_nombre_matches texto-blanco fw-bold'>Hordan</label>
                            </div>
                            <div className='div_imagen_personas_matches position-relative m-2 d-inline-block'>
                                <img className='imagen_personas_matches' src={logo} />
                                <label className='position-absolute label_nombre_matches texto-blanco fw-bold'>Hordan</label>
                            </div>
                            <div className='div_imagen_personas_matches position-relative m-2 d-inline-block'>
                                <img className='imagen_personas_matches' src={logo} />
                                <label className='position-absolute label_nombre_matches texto-blanco fw-bold'>Hordan</label>
                            </div>
                            <div className='div_imagen_personas_matches position-relative m-2 d-inline-block'>
                                <img className='imagen_personas_matches' src={logo} />
                                <label className='position-absolute label_nombre_matches texto-blanco fw-bold'>Hordan</label>
                            </div>
                        </div>
                    </div> : 
                    <div className='fondo-blanco pantalla_match p-3'>
                        <div className='div_imagen_edit_perfil'>
                            <img className='imagen_persona_perfil' src={logo} />
                        </div>
                    <form method='POST' className='mt-3' encType='multipart/form-data' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
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
                    <div className=''>
                      <label className='label_inputs py-2 ps-2' style={{ fontWeight: '700' }}>Subir imagen</label>
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
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      value={''}
                    />
                    <SubmitButton className='mt-3' type="submit" value='submit'>Guardar</SubmitButton>
                  </form>
                    </div>
                    }
                    
                </div>
                <div className='col-9 px-0'>
                    <Cards />
                </div>
            </div>
            
        </div>
        <div className='col-12 p-0 text-center'>
            <div className='fondo-verde py-3 div_footer_admin w-100'>
                <p className='texto-blanco'>Copyright © 2021 TRADE URSELF® - TODOS LOS DERECHOS RESERVADOS</p>
            </div>
        </div>
    </div>
  );
}

export default Home