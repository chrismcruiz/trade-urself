import React from 'react'
import logo from '../borrar/imagen-1.webp'
import Cards from '../components/Cards'

function Home() {
  return (
    <div className='contenedor_home'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-4 px-0'>
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
                    <div className='fondo-blanco pantalla_match'>

                    </div>
                </div>
                <div className='col-8 px-0'>
                    <Cards />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Home
