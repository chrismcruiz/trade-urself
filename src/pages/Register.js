import React from 'react'
import { countries } from '../countries'
import '../css/bootstrap.css'
import '../css/Register.css'

const Register = () => {
  return (
    <div className='container-fluid px-0 pb-3'>
      <div class="row">
        <div class="col-lg-7 col-12">
            <img
              className='image'
              src='https://research.msu.edu/wp-content/uploads/2018/10/helping-coworkers.jpg'
              alt='eren jaeger'
            />
        </div>
        <div class="col-lg-5 col-12 text-start">
          <form action='#' method='post' className='form px-md-0 px-2 pt-lg-5 pt-md-4 pt-3'>
            <h1 className='title'>Registro</h1>
            <div className='form__field'>
              <label htmlFor='name' className='form__label'>
                Nombre:
          </label>
              <input type='text' id='name' className='form__input' required />
            </div>
            <div className='form__field'>
              <label htmlFor='birthday' className='form__label'>
                Fecha de namiento:
          </label>
              <input
                type='date'
                name='birthday'
                id='birthday'
                className='form__input'
                required
              />
            </div>
            <div className='form__field'>
              <label htmlFor='gender' className='form__label'>
                Género:
          </label>

              <div className='form__radio'>
                <div className='form__radio-item'>
                  <input type='radio' name='gender' id='male' />
                  <label htmlFor='male' className='form__label'>
                    Masculino
              </label>
                </div>
                <div className='form__radio-item'>
                  <input type='radio' name='gender' id='female' />
                  <label htmlFor='female' className='form__label'>
                    Femenino
              </label>
                </div>
                <div className='form__radio-item'>
                  <input type='radio' name='gender' id='other' />
                  <label htmlFor='other' className='form__label'>
                    Otro
              </label>
                </div>
              </div>
            </div>
            <div className='form__field'>
              <label htmlFor='country' className='form__label'>
                País:
          </label>
              <select required name='country' id='country' className='form__select'>
                {countries.map((country) => (
                  <option value={country.name.toLowerCase}>{country.name}</option>
                ))}
              </select>
            </div>
            <div className='form__field'>
              <label htmlFor='ocupation' className='form__label'>
                Ocupación:
          </label>
              <select
                required
                name='ocupation'
                id='ocupation'
                className='form__select'
              >
                <option value='student'>Estudiante</option>
                <option value='worker'>Egresado</option>
                <option value='worker'>Profesor</option>
              </select>
            </div>
            <div className='form__field'>
              <label htmlFor='image' className='form__label'>
                Sube una imagen:
          </label>
              <input type='file' id='image' name='image' className='form__input ps-0' />
            </div>
            <div className='form__field'>
              <input
                required
                type='checkbox'
                id='terms'
                className='form__checkbox'
              />
              <label htmlFor='terms' className='form__label'>
                Acepto los términos y condiciones
          </label>
            </div>
            <div className='buttons pt-lg-4 pt-sm-4 pt-3'>
              <button type='submit' className='form__submit'>
                Registrarme
          </button>
              <button type='button' className='form__button mt-sm-0 mt-3 ms-sm-3 ms-0 d-block d-sm-inline-block'>
                Limpiar Campos
          </button>
            </div>
            <a href='' class='registered'>
              Ya estoy registrado
        </a>
          </form>
        </div>
      </div>


    </div>
  )
}

export default Register
