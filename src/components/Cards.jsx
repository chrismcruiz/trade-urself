import React, { useState, useMemo, useEffect, Component } from 'react'
import TinderCard from "react-tinder-card"
import IconButton from '@material-ui/core/IconButton';
import NavigationIcon from '@material-ui/icons/Navigation';
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import '../css/App.css'
// import Buttons from "../components/Buttons"


function Cards(props) {
    props = props.props;
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get("http://localhost:4000/app/users");
            if (req.data.length > 0) {
                for (let i = 0; i < req.data.length; i++) {
                    if (req.data[i]._id === props.idUser) {
                        req.data.splice(i, 1);
                        continue;
                    }
                    if (req.data[i].admin) req.data.splice(i, 1);
                }
                setUsers(req.data);
            }
        }
        fetchData();
    }, [])

    let db = users
    const alreadyRemoved = []
    let charactersState = db

    const [lastDirection, setLastDirection] = useState()
    const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [db])

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        if (direction === 'left') setLastDirection('izquierda')
        else setLastDirection('derecha')
        alreadyRemoved.push(nameToDelete)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
        charactersState = charactersState.filter(character => character.name !== name)
        setUsers(charactersState)
    }

    const swipe = (dir) => {
        const cardsLeft = users.filter(person => !alreadyRemoved.includes(person._id))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1]._id // Find the card object to be removed
            const index = db.map(person => person._id).indexOf(toBeRemoved) // Find the index of which to make the reference to
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

    return (
        <div className='card__container position-relative'>
            <div className='div_contenedor_personas'>
                {users.map((user, index) =>
                    <TinderCard
                        ref={childRefs[index]}
                        className='swipe'
                        preventSwipe={["up", "down"]}
                        onSwipe={(dir) => swiped(dir, user._id)} 
                        onCardLeftScreen={() => outOfFrame(user.name)}
                        key={user._id}
                    >
                        <div className='card p-0'
                        >
                            <div
                                className='p-2 background_foto position-relative'
                                style={{ backgroundImage: `url(./images/${user.photo})` }}
                            >
                                <div className='position-absolute div_info_personas texto-blanco'

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
                            >Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                                essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                                containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                            PageMaker including versions of Lorem Ipsum.</div>
                            <IconButton 
                                className='boton_volver_card shadow d-none'
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
