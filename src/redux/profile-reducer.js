const SET_ACTIVE = 'SET-ACTIVE';
const SET_USERS_CARDS = 'SET-USERS-CARDS';
const SET_ALL_USERS = 'SET-ALL-USERS';
const SET_ALL_INTERESTS = 'SET-ALL-INTERESTS';
const SET_CURRENT_INTERESTS = 'SET-CURRENT-INTERESTS';
const SET_USER = 'SET-USER';
const SET_LIKES = 'SET-LIKES';
const LOG_IN = 'LOG-IN';
const LOG_OUT = 'LOG-OUT';
const UPDATE_LOGINED_DESCRIPTION = 'UPDATE-LOGINED-DESCRIPTION'
const UPDATE_LOGIN_TEXT = 'UPDATE-LOGIN-TEXT';
const UPDATE_PASSWORD_TEXT = 'UPDATE-PASSWORD-TEXT';
const UPDATE_PROFILE_DESCRIPTION = 'UPDATE-PROFILE-DESCRIPTION'

let initialState = {
    userCards: [],
    allUsers: [],
    allInterests: [],
    currentInterests: [],
    userLikes: [],
    loginedUser:{
        user_id:0,
        name:"null",
        way:"null",
        sex:"other",
        description:"Опишіть себе",
        height:0,
        age:0,
        interests:[],
        wish:"not logined",
        from:0,
        to:0,
        count_likes:0
    },
    currentProfile:{
        user_id:0,
        way:"null",
        sex:"other",
        description:"Опишіть себе",
        height:0,
        age:0,
        interests:[],
        wish:"Інше",
        from:0,
        to:0,
        count_likes:0,
        liked:false
    },
    curLogin:'Логін',
    curPassword:'Пароль',
    currentProfileDescription:'desc'
};

export const profileReducer = (state = initialState, action) =>{
    switch(action.type){
        case UPDATE_LOGIN_TEXT:
            return {...state, curLogin: action.text}

        case UPDATE_PASSWORD_TEXT:
            return {...state, curPassword: action.text}

        case SET_ACTIVE:
            state.allUsers.map(user => {
                if(user.user_id === action.id){
                    state.currentProfile = user;
                }
                return(null)
            })
            return state;
            
        case SET_USERS_CARDS:
            return {...state, userCards: action.users}

        case SET_USER:
            return {...state, currentProfile: action.user}

        case LOG_IN:
            return {...state, loginedUser: action.user, userCards:[]}

        case LOG_OUT:
            state.loginedUser.user_id = action.id;
            state.loginedUser.wish = "not logined";
            return {...state, curLogin:'Логін', curPassword:'Пароль', userCards:[]}

        case SET_ALL_USERS:
            return {...state, allUsers:action.users};
        
        case SET_ALL_INTERESTS:
            return {...state, allInterests:action.interests};

        case UPDATE_PROFILE_DESCRIPTION:
            return {...state, currentProfileDescription:action.text}

        case UPDATE_LOGINED_DESCRIPTION:
            state.loginedUser.description = action.text;
            state.currentProfile.description = action.text;
            return {...state}

        case SET_CURRENT_INTERESTS:
            state.allInterests.map(interest => {
                interest.isActive=false 
                return(null)
            })

            action.interests.map(interest => {
                state.allInterests.map(inter => {
                    if(interest.interest_id === inter.interest_id){
                        inter.isActive = true;
                    }
                    return(null)
                })
                return(null)
            })

            return {...state, currentInterests:action.interests}

        case SET_LIKES:
            state.allUsers.map(user => {
                user.liked = false
                return(null)
            })

            action.likes.map(like => {
                state.allUsers.map(user => {
                    if(like.whom_id === user.user_id){
                        user.liked = true;
                    }
                    return(null)
                })
                return(null)
            })
            return {...state, userLikes:action.likes}

        default:
            return state;
    }
}

export const setUsersAC = (users) => ({type: SET_USERS_CARDS, users});
export const setCurUserAC = (user) => ({type: SET_USER, user});
export const setLikesAC = (likes) => ({type: SET_LIKES, likes});
export const logInAC = (user) => ({type: LOG_IN, user});
export const updateLoginTextAC = (text) => ({type: UPDATE_LOGIN_TEXT, text});
export const updatePasswordTextAC = (text) => ({type: UPDATE_PASSWORD_TEXT, text});
export const logOutAC = (id) => ({type: LOG_OUT, id});
export const setAllUsersAC = (users) => ({type:SET_ALL_USERS,users});
export const updateProfileDescriptionAC = (text) => ({type:UPDATE_PROFILE_DESCRIPTION,text});
export const updateLoginedDescriptionAC = (text) => ({type:UPDATE_LOGINED_DESCRIPTION,text});
export const setAllInterestsAC = (interests) => ({type:SET_ALL_INTERESTS,interests});
export const setCurrentInterestsAC = (interests) => ({type:SET_CURRENT_INTERESTS,interests});

export default profileReducer;