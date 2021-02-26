import React, { useState, useMemo, useEffect, Component } from 'react'
import TinderCard from "react-tinder-card"
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import NavigationIcon from '@material-ui/icons/Navigation';
import axios from 'axios'

function Cards(props) {
    props = props.props;
    
    const [users, setUsers] = useState([]);
    const [sesions, setSesions] = useState([]);
    //console.log(props);
    
    useEffect(() => {
        async function fetchData() {
            const req = await axios.get("http://localhost:4000/app/users");
            if(req.data.length > 0){
                for(var i = 0; i < req.data.length; i++){
                    console.log('aqui')
                    console.log(req.data[i].admin)
                    if(req.data[i]._id === props.idUser){
                        req.data.splice(i, 1);
                        continue;
                    }
                    // if(req.data[i].admin === true){
                    //     req.data.splice(i, 1);
                    //     break;
                    // }
                }
            }
            setUsers(req.data);
        }
        fetchData();
    }, [])

    /*useEffect(() => {
        async function fetchData() {
        const req = await axios.get("http://localhost:4000/app/users/sesion");
        //console.log(req.data)
        req.data.map((i) =>{
            setSesions(i.userId);
        })
        }
        fetchData();
    }, [])*/

    //console.log(props.props);

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


    // const alreadyRemoved = []
    // const [characters] = useState(db)
    // const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

    // const swipe = (dir) => {
    //     const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    //     console.log(cardsLeft)
    //     if (cardsLeft.length) {
    //         const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
    //         console.log(toBeRemoved)
    //         const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
    //         console.log(index)
    //         alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
    //         childRefs[index].current.swipe(dir) // Swipe the card!
    //     }
    // }

    const alreadyRemoved = []
    let characters = users
    const childRefs = useMemo(() => Array(users.length).fill(0).map(i => React.createRef()), [])
    const swipe = (dir) => {
        const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person._id))
        console.log(cardsLeft)
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1]._id // Find the card object to be removed
            console.log(toBeRemoved)
            const index = users.map(person => person._id).indexOf(toBeRemoved)
            console.log(index) // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            //childRefs[index].current.swipe(dir) // Swipe the card!
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

    function favUser(person, idUser){
        fetch('http://localhost:4000/app/fav/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person: person,
                idUser: idUser,
            }),
        }).then(res => res.json()).then(json => {
            if (json.success) {
            
            } else {

            }
        })
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
                        <div className='card p-0' 
                        ref={card_personas}>
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
                                    <p className='h4'>{user.career}</p>
                                </div>
                            </div> 
                            <div 
                            className='p-0 overflow-auto d-none div_descripcion'
                            ref={div_descripcion_hover}
                            >Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining 
                            essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
                            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus 
                            PageMaker including versions of Lorem Ipsum.</div>  
                            <IconButton className='boton_volver_card shadow d-none'
                            onClick={ocultarInfo}
                             ref={botton_hover}>
                                <NavigationIcon 
                                className='buttons__replay botton_navigation'
                                fontSize='large'/>
                            </IconButton>                   
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
                                <IconButton onClick={favUser(user, props.idUser)}>
                                    <FavoriteIcon 
                                    className='buttons__fav'
                                    fontSize='large'/>
                                </IconButton>  
                            </div>              
                        </div>
                    </TinderCard>
                ))}
            </div>
            {/* <div className='div_contenedor_personas d-flex justify-content-center'>

                {characters.map((character, index) =>
                <TinderCard ref={childRefs[index]} className='swipe' key={character.name}>
                    <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                    <h3>{character.name}</h3>
                    </div>
                    <div className='buttons'>
                        <button onClick={() => swipe('left')}>Swipe left!</button>
                        <button onClick={() => swipe('right')}>Swipe right!</button>
                    </div>
                </TinderCard>
                )}
            </div> */}
        </div>
    )
}

export default Cards
