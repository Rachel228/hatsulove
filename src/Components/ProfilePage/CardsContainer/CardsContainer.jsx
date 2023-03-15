import React from 'react';
import Cards from './Cards';
import {connect} from 'react-redux';
import { setUsersAC, setCurUserAC, setCurrentInterestsAC, setLikesAC } from '../../../redux/profile-reducer';

let mapStateToProps = (state) => {
    return{
        users: state.profiles.userCards,
        wish: state.profiles.loginedUser.wish,
        from: state.profiles.loginedUser.from,
        to: state.profiles.loginedUser.to,
        loginedUserId: state.profiles.loginedUser.user_id
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurUser: (user) => {
            dispatch(setCurUserAC(user))
        },
        setCurrentInterests: (interests) => {
            dispatch(setCurrentInterestsAC(interests))
        },
        setLikes: (likes) => {
            dispatch(setLikesAC(likes))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);