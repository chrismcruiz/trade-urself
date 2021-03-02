import React, {useState, useEffect} from 'react'

import axios from 'axios'

const Matches = (props) => {

    props = props.props

    const [aMatchesUser, setMatchesUser] = useState([]);

    useEffect(() => {
        async function matches() {
            
            const req = await axios.post("http://localhost:4000/app/users/match",{
                _id: props.idUser
            });
            
            if (req.data) {
                var aMatches = req.data;
                const req2 = await axios.post("http://localhost:4000/app/matches",{
                    matches: aMatches
                });
                if(req2.data){
                    setMatchesUser(req2.data);
                }
            }
        }
        matches()
    }, [])

    return (
        <div className='fondo-blanco pantalla_match p-3'>
            <h2 className='h5 pl-2'>Matches</h2>
            <div className='div_personas_matches'>
                {aMatchesUser.map((match, index) =>
                    <div className='div_imagen_personas_matches position-relative m-2 d-inline-block'>
                        <img className='imagen_personas_matches' src={`/images/${match.photo}`} />
                        <label className='position-absolute label_nombre_matches texto-blanco fw-bold'>{match.name}</label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Matches
