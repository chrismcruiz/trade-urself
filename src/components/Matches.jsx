import React from 'react'
import logo from '../borrar/imagen-1.png'

const Matches = () => {
    return (
        <div>
            <div className='fondo-blanco pantalla_match p-2'>
                <div className='div_personas_matches' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
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
    )
}

export default Matches
