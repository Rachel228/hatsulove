import React from 'react';
import {connect} from 'react-redux';
import { setCurrentAC, setPhotosAC } from '../../redux/photo-reducer';
import { logInAC } from '../../redux/profile-reducer';
import GallerySlider from './GallerySlider';

let mapStateToProps = (state, ownProps) => {
    return{
        allPhotos: state.photos.allPhotos,
        currentProfile: state.profiles.currentProfile,
        loginedUser: state.profiles.loginedUser,
        current: state.photos.current,
        setActive: ownProps.setActive
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        setPhotos: (photos) => {
            dispatch(setPhotosAC(photos))
        },
        setCurrent: (cur) => {
            dispatch(setCurrentAC(cur))
        },
        logIn:(user) => {
            dispatch(logInAC(user));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GallerySlider);