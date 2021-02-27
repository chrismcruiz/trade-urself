import React from 'react'
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import "../css/App.css"

const Buttons = () => {
    return (
        <div className='buttons-container pt-5'>
            <div className='buttons d-flex justify-content-center'>
                <IconButton>
                    <ReplayIcon
                        className='buttons__replay'
                        fontSize='large' />
                </IconButton>
                <IconButton>
                    <CloseIcon
                        className='buttons__close'
                        
                        fontSize='large' />
                </IconButton>
                <IconButton>
                    <FavoriteIcon
                        className='buttons__fav'
                        fontSize='large' />
                </IconButton>
            </div>
        </div>
    )
}

export default Buttons
