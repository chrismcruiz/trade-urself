import React, { useState, useMemo, useEffect, Component } from 'react'
import TinderCard from "react-tinder-card"
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'

function Cards(props) {
    const [users, setUsers] = useState([]);
    const [sesions, setSesions] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const req = await axios.get("http://localhost:4000/app/users");
        setUsers(req.data);
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
        const req = await axios.get("http://localhost:4000/app/users/sesion");
        //console.log(req.data)
        req.data.map((i) =>{
            setSesions(i.userId);
        })
        }
        fetchData();
    }, [])

    console.log(props.props);

    // let unique = [Set(sesions)];
    // console.log(unique);

    // function onlyUnique(value, index, self) {
    //     return self.indexOf(value) === index;
    // }
    // const unique = sesions.filter(onlyUnique);
    // console.log(unique);

    // sesions.map((sesion) => {
    //     let ids = []
    //     ids = [...ids,sesion.userId]
    //     ids.push(sesion.userId)
    //     //const ids = sesion.userId
    //     console.log(ids)
    // })
    // function filterUsuarios(){
        
    // }

    // async function fetchData() {
    //     const req = await axios.get("http://localhost:4000/app/users");
    //     console.log(req.data)
    // }
    
    // fetchData();

    const alreadyRemoved = []
    const [characters] = users

    const childRefs = useMemo(() => Array(users.length).fill(0).map(i => React.createRef()), [])

    const swipe = (dir) => {
        const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
        if (cardsLeft.length) {
        const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
        const index = users.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
        alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
        childRefs[index].current.swipe(dir) // Swipe the card!
        }
    }

    function calcularEdad(años) {
        años = años;
        var hoy = new Date();
        var cumpleanos = new Date(años);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
        return edad;
    }

    const imagen_persona_card = React.createRef();
    const div_datos_persona = React.createRef();
    
    function mostrarInfo(){
        imagen_persona_card.current.className = 'tarjeta_pequeña';
        div_datos_persona.current.className = 'div_persona_hover';
    }

    return (
        <div className='card__container position-relative'>
            <div className='div_contenedor_personas d-flex justify-content-center'>
                {users.map((user, index)=>(
                    <TinderCard
                        ref={childRefs[index]}
                        className='swipe'
                        preventSwipe={["up", "down"]}
                        key={user._id}
                    >
                        <div className='card p-0' >
                            <div
                            className='p-2 background_foto position-relative'
                            style={{ backgroundImage: `url(./images/${user.photo})`}}
                            ref={imagen_persona_card}
                            >
                                <div className='position-absolute div_info_personas texto-blanco' 
                                    onClick={mostrarInfo}
                                    ref={div_datos_persona}
                                    >
                                    <h3 className='m-0 d-flex mb-2' >
                                        {user.name} -
                                        <p className='ml-3 font-weight-normal'>{calcularEdad(user.birthday)}</p>
                                    </h3>
                                    <p className='h4 p_carrera'>{user.career.toUpperCase()}</p>
                                </div>
                            </div> 
                            <div className='p-0 overflow-auto d-none div_descripcion'>Descripcion</div>                     
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className='buttons-container'>
                <div className='buttons d-flex'>
                    <IconButton>
                        <ReplayIcon 
                        className='buttons__replay'
                        fontSize='large'/>
                    </IconButton>
                    <IconButton onClick={() => swipe('left')}>
                        <CloseIcon 
                        className='buttons__close'
                        fontSize='large'/>
                    </IconButton>
                    <IconButton onClick={() => swipe('right')}>
                        <FavoriteIcon 
                        className='buttons__fav'
                        fontSize='large'/>
                    </IconButton>  
                </div>              
            </div>
        </div>
    )
}

export default Cards
