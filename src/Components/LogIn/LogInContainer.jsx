import React from 'react';
import {connect} from 'react-redux';
import LogIn from './LogIn';
import { logInAC, updateLoginTextAC, updatePasswordTextAC,
    setCurrentInterestsAC, setLikesAC } from '../../redux/profile-reducer';

let mapStateToProps = (state, ownProps) => {
    return{
        setModalActive: ownProps.setModalActive,
        setModalContent: ownProps.setModalContent,
        loginedUserId: state.profiles.loginedUser.user_id,
        loginedUserName: state.profiles.loginedUser.name,
        login: state.profiles.curLogin,
        password: state.profiles.curPassword,
        loginedUser: state.profiles.loginedUser,
        loginActive: ownProps.loginActive,
        setLoginActive: ownProps.setLoginActive,
        openRegisterModal: ownProps.openRegisterModal
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        logIn:(user) => {
            dispatch(logInAC(user));
        },
        updateLoginText:(text)=>{
            dispatch(updateLoginTextAC(text))
        },
        updatePasswordText:(text)=>{
            dispatch(updatePasswordTextAC(text))
        },
        setCurrentInterests: (interests) =>{
            dispatch(setCurrentInterestsAC(interests));
        },
        setLikes: (likes) => {
            dispatch(setLikesAC(likes))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);