import React, { useState, useMemo } from 'react'
import TinderCard from "react-tinder-card"
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

const users = [
    {id: 1,
    name:'Christian',
    imagen:'https://i.pinimg.com/originals/19/76/55/19765567d0e6c453d5b55b94d3133866.jpg'
    },
    {id: 2,
    name:'Hordan',
    imagen:'https://i.pinimg.com/originals/19/76/55/19765567d0e6c453d5b55b94d3133866.jpg'
    }
]

function Cards() {

    const alreadyRemoved = []
    const [characters] = useState(users)

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

    return (
        <div className='card__container position-relative'>
            <div className='div_contenedor_personas d-flex justify-content-center'>
                {users.map((user,index)=>(
                    <TinderCard
                    ref={childRefs[index]}
                    className='swipe'
                    preventSwipe={["up", "down"]}
                    key={user.id}
                    >
                        <div 
                        style={{backgroundImage:`url(${user.imagen})`}}
                        className='card'
                        >
                            <h3 className='m-0'>
                                {user.name}
                            </h3>
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
