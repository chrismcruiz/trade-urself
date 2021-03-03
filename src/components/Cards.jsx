import React, { useState, useMemo, useEffect } from 'react'
import TinderCard from "react-tinder-card"
import IconButton from '@material-ui/core/IconButton';
import NavigationIcon from '@material-ui/icons/Navigation';
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import '../css/App.css'
import { filtrarUser, recorrerObjeto } from '../utils/Utils'
import { CircularProgress } from '@material-ui/core';
// import Buttons from "../components/Buttons"

function Cards(props) {
    props = props.props;

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const peopleLiked = recorrerObjeto(filtrarUser(props.users, props.idUser)).liked
    const [matches, setMatches] = useState(false);
    // peopleLiked = Object.values(peopleLiked)
    // console.log('hola')
    // console.log(peopleLiked.indexOf('6038742ce9e05e0e789dd80a'))

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get("http://localhost:4000/app/users");
            if (req.data.length > 0) {
                for (let i = 0; i < req.data.length; i++) {
                    if (req.data[i].admin){
                        req.data.splice(i, 1);
                        break;
                    }           
                }
                setUsers(req.data);
                setIsLoading(false);

            }
        }
        fetchData();
    }, [])

    const limpiarUsers = (users) => {
        for (let i = 0; i < users.length; i++) {
            if (peopleLiked.includes(users[i]._id)) {
                users.splice(i, 1);
                continue;
            } else if (users[i]._id === props.idUser) {
                users.splice(i, 1);
                continue;
            }
        }
    }

    limpiarUsers(users)

    let db = users
    const alreadyRemoved = []
    // let charactersState = db

    const [lastDirection, setLastDirection] = useState()
    const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [db])

    const swiped = (direction, nameToDelete) => {
        //console.log('removing: ' + nameToDelete)
        alreadyRemoved.push(nameToDelete)
        if (direction === 'right') {
            enviarLike(props.idUser, nameToDelete)
        } 
    }

    // const outOfFrame = (name) => {
    //     console.log(name + ' left the screen!')
    //     charactersState = charactersState.filter(character => character.name !== name)
    //     setUsers(charactersState)
    // }

    const swipe = (dir) => {
        const cardsLeft = users.filter(person => !alreadyRemoved.includes(person._id))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1]._id // Find the card object to be removed
            const index = db.map(person => person._id).indexOf(toBeRemoved) // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir) // Swipe the card!
        }
        
    }

    const setMatch = async (idUser, idPersonLiked)  => {
        const body = { idUser, idPersonLiked }
        await axios.post('http://localhost:4000/app/setmatch', body)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    }

    const mostrarMatch = () =>{
        setTimeout(function(){ setMatches(true); }, 500)
    }

    const revisarLikes = (idUser, idPersonLiked) => {
        let match = false
        const liked = recorrerObjeto(db.filter(person => person._id === idPersonLiked)).liked
        if (liked.includes(idUser)) match = true
        if (match) {
            setMatch(idUser, idPersonLiked)
            setMatch(idPersonLiked, idUser)
            mostrarMatch()
        }
        
    }
    

    const enviarLike = async (idUser, idPersonLiked) => {
        const body = { idUser, idPersonLiked }
        await axios.post('http://localhost:4000/app/liked', body)
            .then(response => {
                if (response.status === 200) {
                    revisarLikes(idUser, idPersonLiked)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const calcularEdad = (años) => {
        años = años;
        let hoy = new Date();
        let cumpleanos = new Date(años);
        let edad = hoy.getFullYear() - cumpleanos.getFullYear();
        let m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
        return edad;
    }

    
    const imagen_persona_card = React.createRef();
    const div_datos_persona = React.createRef();
    const div_descripcion_hover = React.createRef();
    const card_personas = React.createRef();
    const botton_hover = React.createRef();

    function mostrarInfo(){
        imagen_persona_card.current.className = 'tarjeta_pequeña';
        div_datos_persona.current.className = 'div_persona_hover';
        div_descripcion_hover.current.className = 'div_descripcion d-block p-3';
        card_personas.current.className = 'card p-0 card_hover';
        botton_hover.current.className = 'boton_volver_card d-block';
    }

    function ocultarInfo(){
        imagen_persona_card.current.className = 'tarjeta_pequeña tarjeta_grande';
        div_datos_persona.current.className = 'div_persona_hover';
        div_descripcion_hover.current.className = 'div_descripcion d-none p-3 ';
        card_personas.current.className = 'card p-0 card_hover';
        botton_hover.current.className = 'boton_volver_card d-none';
    }

    if (isLoading) {
        return (<div className="vertical-center"><CircularProgress color="primary" size={60} /></div>)
    }

    if (users.length === 0) {
        return (<div className='infoText d-inline-block d-flex justify-content-center align-items-center' >No hay personas para mostrar...</div>)
    }

    const quitarMatch = () =>{
        setTimeout(function(){ setMatches(false); }, 1800)
        setTimeout(function(){ window.location.reload() }, 1100)
    }



    if (matches) {
        return(
                <div>
                    <div className='alert_match'>
                        ¡Match!
                    </div>
                    {quitarMatch()}
                </div>)
    }

    return (
        <div className='card__container position-relative'>
            <div className='div_contenedor_personas'>
                {users.map((user, index) =>
                    <TinderCard
                        className='swipe'
                        ref={childRefs[index]}
                        key={user._id}
                        onSwipe={(dir) => swiped(dir, user._id)}
                        preventSwipe={["up", "down"]}
                    >
                        <div className='card p-0'
                         ref={card_personas}
                        >
                            <div
                                className='p-2 background_foto position-relative'
                                style={{ backgroundImage: `url(./images/${user.photo})` }}
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
                                    <p className='h4'>{user.career}</p>
                                </div>
                            </div>
                            <div
                                className='p-0 overflow-auto d-none div_descripcion'
                                ref={div_descripcion_hover}
                                >{user.description}
                                </div>
                            <IconButton
                                className='boton_volver_card shadow d-none'
                                onClick={ocultarInfo}
                                ref={botton_hover}
                            >
                                <NavigationIcon
                                    className='buttons__replay botton_navigation'
                                    fontSize='large' />
                            </IconButton>
                        </div>
                    </TinderCard>
                )}
            </div>
            {/* Botones */}
            <div className='buttons-container pt-5'>
                <div className='buttons d-flex justify-content-center'>
                    <IconButton
                        onClick={() => swipe('left')}
                    >
                        <CloseIcon
                            className='buttons__close'
                            fontSize='large'
                        />
                    </IconButton>
                    <IconButton
                        onClick={() => swipe('right')}
                    >
                        <FavoriteIcon
                            className='buttons__fav'
                            fontSize='large'
                        />
                    </IconButton>
                </div>
            </div>
            {lastDirection ? <h2 key={lastDirection} className='infoText'>Deslizaste a la {lastDirection}</h2> : <h2 className='infoText'>¡Desliza una tarjeta o presiona un botón para comenzar!</h2>}
        </div>
    )
}

export default Cards
