import React from 'react'
import logo from '../borrar/imagen-1.webp'
import Cards from '../components/Cards'

function Home() {
  return (
    <div className='contenedor_home'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-3 px-0' style={{width:'19.75%'}}>
                    <div className='menu_arriba w-100'>
                        <div className='py-3 px-4'>
                            <a href='' className='d-flex align-items-center'>
                                <img className='imagen_perfil' src={logo} />                                  
                                <p className='ps-3 m-0 text-titulos-1'>
                                    Mi perfil
                                </p>
                            </a>
                        </div>
                    </div>
                    <div className='fondo-blanco pantalla_match p-2'>
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
                    </div>
                </div>
                <div className='col-9 px-0'>
                    <Cards />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Home
