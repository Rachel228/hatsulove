const COUNT_CHARS = 'COUNT-CHARS';
const UPDATE_NAME_TEXT = 'UPDATE-NAME-TEXT'
const UPDATE_DATE_TEXT = 'UPDATE-DATE-TEXT'
const UPDATE_LOGIN_TEXT = 'UPDATE-LOGIN-TEXT'
const UPDATE_PASS_TEXT = 'UPDATE-PASS-TEXT'
const UPDATE_FROM_TEXT = 'UPDATE-FROM-TEXT'
const UPDATE_TO_TEXT = 'UPDATE-TO-TEXT'
const UPDATE_HEIGHT_TEXT = 'UPDATE-HEIGHT-TEXT'
const SET_PHOTO = 'SET-PHOTO'
const SET_CITIES_ARRAY = 'SET-CITIES-ARRAY'
const SET_CURRENT_CITY = 'SET-CURRENT-CITY'
const SET_CURRENT_GENDER = 'SET-CURRENT-GENDER'
const SET_CURRENT_WISH = 'SET-CURRENT-WISH'

const photoPlaceholder = `https://cdn.dribbble.com/users/803548/screenshots/3510715/placeholder.png?compress=1&resize=400x300`;

let initialState = {
    cities:[],
    maxChars:300,
    charsLeft:300,
    currentCity:``,
    currentNameText:``,
    currentLoginText:``,
    currentPassText:``,
    currentGender:'',
    currentWish:'',
    currentHeightText:'',
    currentFromText:'',
    currentToText:'',
    currentDate:'',
    currentPhoto: photoPlaceholder
};

export const registerReducer = (state = initialState, action) =>{
    switch(action.type){
        case COUNT_CHARS:
            return {...state, charsLeft: action.value}

        case UPDATE_NAME_TEXT:
            return {...state, currentNameText: action.text}

        case UPDATE_LOGIN_TEXT:
            return {...state, currentLoginText: action.text}

        case UPDATE_PASS_TEXT:
            return {...state, currentPassText: action.text}

        case UPDATE_DATE_TEXT:
            return {...state, currentDate: action.date}
            
        case UPDATE_FROM_TEXT:
            return {...state, currentFromText: action.text}

        case UPDATE_TO_TEXT:
            return {...state, currentToText: action.text}

        case UPDATE_HEIGHT_TEXT:
            return {...state, currentHeightText: action.text}

        case SET_PHOTO:
            return {...state, currentPhoto: action.path}
        
        case SET_CITIES_ARRAY:
            return {...state, cities: action.cities}

        case SET_CURRENT_CITY:
            return {...state, currentCity: action.city}

        case SET_CURRENT_GENDER:
            return {...state, currentGender: action.gender}

        case SET_CURRENT_WISH:
            return {...state, currentWish: action.text}

        default:
            return state;
    }
}

export const countCharsAC = (value) => ({type:COUNT_CHARS, value:value});
export const updateDateTextAC = (value) => ({type:UPDATE_DATE_TEXT, date:value});
export const updateNameTextAC = (text) => ({type:UPDATE_NAME_TEXT, text:text});
export const updateLoginTextAC = (text) => ({type:UPDATE_LOGIN_TEXT, text:text});
export const updatePassTextAC = (text) => ({type:UPDATE_PASS_TEXT, text:text});
export const updateFromTextAC = (text) => ({type:UPDATE_FROM_TEXT, text:text});
export const updateToTextAC = (text) => ({type:UPDATE_TO_TEXT, text:text});
export const updateHeightTextAC = (text) => ({type:UPDATE_HEIGHT_TEXT, text:text});
export const setPhotoAC = (file) => ({type:SET_PHOTO, path:file});
export const setCitiesArrayAC = (cities) => ({type:SET_CITIES_ARRAY, cities:cities});
export const setCurrentCityAC = (city) => ({type:SET_CURRENT_CITY, city:city});
export const setCurrentGenderAC = (gender) => ({type:SET_CURRENT_GENDER, gender:gender});
export const setWishAC = (text) => ({type:SET_CURRENT_WISH, text:text});


export default registerReducer;