import React from "react";

// import logo from '../images/207bd542-ca2a-4553-9024-2b6f2ee80011-1614290002828.jpg'
import Cards from '../components/Cards'
import {
  Input,
  SubmitButton,
} from "../components/accountBox/common";
import CreateIcon from '@material-ui/icons/Create';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Buttons from "../components/Buttons"
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer"

function Home(props) {
  props = props.props
  // const [perfilBack, setPerfilBack] = useState(false);
  // const handlePerfilBack = () => {
  //   perfilShow ? setPerfilShow(true) : setPerfilShow(true);
  // }
 
  return (
    <div className='contenedor_home'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-3 px-0' style={{ width: '19.75%' }}>
            {/* Menú lateral */}
            <Sidebar props={props} />
          </div>
          <div className='col-9 px-0 seccion_tarjetas'>
            {/* Tarjetas */}
            <Cards props={props} />
            {/* Botones */}
            <Buttons />
          </div>
        </div>
      </div>
      {/* Parte del CopyRight */}
      <Footer props={props} />
    </div>
  );
}

export default Home
