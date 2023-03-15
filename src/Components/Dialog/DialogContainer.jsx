import React from 'react';
import {connect} from 'react-redux';
import {setDialogsAC, updateCurrentMessageTextAC} from '../../redux/dialogs-reducer'

import Dialog from './Dialog';

let mapStateToProps = (state) => {
    return{
        currentProfile: state.profiles.currentProfile,
        loginedUser: state.profiles.loginedUser,
        allDialogs: state.dialogs.allDialogs,
        currentMessage: state.dialogs.currentMessage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        setDialogs: (dialogs) => {
            dispatch(setDialogsAC(dialogs));
        },
        updateCurrentMessageText: (text) => {
            dispatch(updateCurrentMessageTextAC(text))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);