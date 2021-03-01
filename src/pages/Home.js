import React, { useState, useEffect } from "react";

// import logo from '../images/207bd542-ca2a-4553-9024-2b6f2ee80011-1614290002828.jpg'
import Cards from '../components/Cards'
import {
  Input,
  SubmitButton,
} from "../components/accountBox/common";
import CreateIcon from '@material-ui/icons/Create';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer"
import { filtrarUser, recorrerObjeto } from '../utils/Utils'
import axios from 'axios'


function Home(props) {
  props = props.props
  //console.log(props);
  // const [loading, setLoading] = useState(true)

  //let matches = recorrerObjeto(filtrarUser(props.users, props.idUser)).matches
  // const arrayMatches = matches.splice(1, 1)
  //console.log(matches)
  // //const array = ["2", "5", "9"];
  // const index = matches.indexOf("");
  //   if (index > -1) {
  //     matches.splice(index, 1);
  //   }

  //   // array = [2, 9]
  //   console.log(matches); 

//   useEffect(() => {
//     async function fetchMatches() {
//         // const params = {
//         //   _id: ['603c7ac622fb3b09609719c0'] 
//         // }
//         const req = await axios.post("http://localhost:4000/app/users/match",{
//           _id: arrayMatches
//         });
//         if (req.data) {
//             console.log('crhis')
//             console.log(req.data)
//         }
//         setLoading(false);
//     }
//     fetchMatches();
// }, [])

  // const separarMatches = () =>{
  //     matches.forEach(function(elemento,indice,array) {
  //     console.log(recorrerObjeto(props.users,elemento));
  //   })
  // }

  // console.log(separarMatches())

  //setLoading(false)
  // const arrayMatch = new Array(matches)

  // const separarMatches = () =>{
  //     let match = []
  //     arrayMatch.forEach(function(elemento,indice,array) {
  //     console.log(elemento[1]);
  //     //match.push(elemento[indice])
  //     // let match = ''
  //     // for (let i = 1; i <= Array(elemento).length; i++) {
  //     //   match = recorrerObjeto(filtrarUser(props.users,elemento[i]))
  //     //   console.log(match)
  //     // }
  //     return match
  //   })
  // }
  // console.log(separarMatches())

  // //const arrayMatch = new Array(matches)
  // const separarMatches = (matches) => {
  //   let photos =[]
  //   for(let i = 1; i <= 3; i++ ){
  //      photos.push(recorrerObjeto(filtrarUser(props.users,matches[i])).photo)
  //      //console.log(recorrerObjeto(matches[i]))
  //   }
  //   setMatch(photos)
  // }
  // console.log(separarMatches(matches))
  // console.log(match)
  // if(loading){
  //   return (<div className="vertical-center"><CircularProgress color="primary" size={60} /></div>)
  // }
  return (
    <div>
    <div className='contenedor_home'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-3 px-0 fondo-blanco' style={{ width: '19.75%' }}>
            {/* Menú lateral */}
            <Sidebar props={props} />
          </div>
          <div className='col-9 px-0 seccion_tarjetas d-flex justify-content-center'>
            {/* Tarjetas */}
            <Cards props={props} />
          </div>
        </div>
      </div>
      {/* Parte del CopyRight */}
    </div>
    <Footer props={props} />
    </div>
  );
}

export default Home
