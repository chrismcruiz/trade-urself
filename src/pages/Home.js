import { FiberPinRounded } from '@material-ui/icons';
import React from 'react'
import logo from '../borrar/imagen-1.webp'
import Cards from '../components/Cards'


function Home() {
    // const logOut = (e) => {
    //     e.preventDefault();

    //     axios.get('http://localhost:4000/app/logout/', signedin)
    //       .then(response => {
    //         console.log(response.data);
    //         if (response.status === 200 && response.data.success) {
    //           console.log(response)
    //           window.location = '/home'
    //         }
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   }
  return (
    <div className='contenedor_home'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-3 px-0' style={{width:'19.75%'}}>
                    <div className='menu_arriba w-100'>
                        <div className='py-3 px-4'>
                            <a href='' className='d-flex align-items-center'>
                                <img className='imagen_perfil mr-3' src={logo} />                                  
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
                        {/* <div className='mt-5 d-flex justify-content-center'>
                            <a href="#" className='link text-primary' onClick={logOut}>Cerrar sesión (provisional)</a>
                        </div> */}
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