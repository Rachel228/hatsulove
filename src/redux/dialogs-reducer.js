const SET_DIALOGS = 'SET-DIALOGS';
const UPDATE_CURRENT_MESSAGE_TEXT = 'UPDATE-CURRENT-MESSAGE-TEXT'

let initialState = {
    allDialogs:[],
    currentMessage:''
};

export const dialogsReducer = (state = initialState, action) =>{
    switch(action.type){
        case UPDATE_CURRENT_MESSAGE_TEXT:
            return {...state, currentMessage: action.text}

        case SET_DIALOGS:
            return {...state, allDialogs: action.dialogs}

        default:
            return state;
    }
}

export const setDialogsAC = (dialogs) => ({type: SET_DIALOGS, dialogs});
export const updateCurrentMessageTextAC = (text) => ({type: UPDATE_CURRENT_MESSAGE_TEXT, text});


export default dialogsReducer;