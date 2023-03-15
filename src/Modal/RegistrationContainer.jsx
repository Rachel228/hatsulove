import Registration from "./Registration";
import {connect} from 'react-redux';
import {countCharsAC, updateHeightTextAC, updateNameTextAC,
     setPhotoAC, setCitiesArrayAC, setCurrentCityAC,
      setCurrentGenderAC, updateDateTextAC, updateLoginTextAC,
      updatePassTextAC, updateFromTextAC, updateToTextAC,
      setWishAC} from "../redux/registration-reducer"

let mapStateToProps = (state, ownProps) => {
    return{
        maxChars: state.registration.maxChars,
        charsLeft: state.registration.charsLeft,
        cities: state.registration.cities,
        wishGenders: state.registration.wishGenders,
        setActive: ownProps.setActive,
        user: {name:state.registration.currentNameText, 
            gender:state.registration.currentGender, 
            city:state.registration.currentCity, 
            photo:state.registration.currentPhoto,
            date:state.registration.currentDate,
            password:state.registration.currentPassText,
            login:state.registration.currentLoginText,
            wish:state.registration.currentWish,
            from:state.registration.currentFromText,
            to:state.registration.currentToText,
            height:state.registration.currentHeightText
        }
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        countChars: (value) => {
            dispatch(countCharsAC(value))
        },

        updateNameText: (text) => {
            dispatch(updateNameTextAC(text))
        },
        updateDateText: (value) => {
            dispatch(updateDateTextAC(value))
        },
        updateLoginText: (text) => {
            dispatch(updateLoginTextAC(text))
        },
        updatePassText: (text) => {
            dispatch(updatePassTextAC(text))
        },
        updateFromText: (text) => {
            dispatch(updateFromTextAC(text))
        },
        updateToText: (text) => {
            dispatch(updateToTextAC(text))
        },
        updateHeightText: (text) => {
            dispatch(updateHeightTextAC(text))
        },

        setWish: (text) => {
            dispatch(setWishAC(text))
        },
        setPhoto: (file) => {
            dispatch(setPhotoAC(file))
        },
        setCitiesArray: (cities) => {
            dispatch(setCitiesArrayAC(cities))
        },
        setCurrentCity: (city) => {
            dispatch(setCurrentCityAC(city))
        },
        setCurrentGender: (gender) => {
            dispatch(setCurrentGenderAC(gender))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);