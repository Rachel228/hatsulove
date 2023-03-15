import React from 'react';
import ProfilePage from './ProfilePage';
import {connect} from 'react-redux';
import { setAllUsersAC, updateProfileDescriptionAC,
        updateLoginedDescriptionAC, setAllInterestsAC,
        setCurrentInterestsAC, setLikesAC } from '../../redux/profile-reducer';
import {setDialogsAC} from '../../redux/dialogs-reducer'
import {setCurrentAC, setPhotosAC, setPhotosToAddAC} from '../../redux/photo-reducer'

let mapStateToProps = (state, ownProps) => {
    return{
        loginedUser: state.profiles.loginedUser,
        currentProfile: state.profiles.currentProfile,
        allUsers: state.profiles.allUsers,
        descText: state.profiles.currentProfileDescription,
        allInterests: state.profiles.allInterests,
        currentInterests: state.profiles.currentInterests,
        userLikes: state.profiles.userLikes,
        photoToAdd: state.photos.photoToAdd,
        openSliderModal: ownProps.openSliderModal
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        setAllUsers: (users) => {
            dispatch(setAllUsersAC(users))
        },
        updateProfileDescription: (text) => {
            dispatch(updateProfileDescriptionAC(text))
        },
        updateLoginedDescription: (text) =>{
            dispatch(updateLoginedDescriptionAC(text))
        },
        setAllInterests: (interests) =>{
            dispatch(setAllInterestsAC(interests))
        },
        setCurrentInterests: (interests) => {
            dispatch(setCurrentInterestsAC(interests))
        },
        setLikes: (likes) => {
            dispatch(setLikesAC(likes))
        },
        setDialogs: (dialogs) => {
            dispatch(setDialogsAC(dialogs));
        },
        setPhotos: (photos) => {
            dispatch(setPhotosAC(photos))
        },
        setCurrent: (cur) => {
            dispatch(setCurrentAC(cur))
        },
        setPhotosToAdd: (photos) => {
            dispatch(setPhotosToAddAC(photos))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);