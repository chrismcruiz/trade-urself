import React from 'react'
import { countries } from '../countries'
import '../css/Register.css'

const Register = () => {
  return (
    <div className='container'>
      <div className='image-container'>
        <img
          className='image'
          src='https://i.pinimg.com/originals/86/67/d3/8667d39a220e896476d35e57b66a926d.jpg'
          alt='eren jaeger'
        />
      </div>
      <form action='#' method='post' className='form'>
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
            <option value='worker'>Trabajador</option>
          </select>
        </div>
        <div className='form__field'>
          <label htmlFor='image' className='form__label'>
            Sube una imagen:
          </label>
          <input type='file' id='image' name='image' className='form__input' />
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
        <div className='buttons'>
          <button type='submit' className='form__submit'>
            Registrarme
          </button>
          <button type='button' className='form__button'>
            Limpiar Campos
          </button>
        </div>
        <a href='' class='registered'>
          Ya estoy registrado
        </a>
      </form>
    </div>
  )
}

export default Register
