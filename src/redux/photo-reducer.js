const SET_PHOTOS = 'SET-PHOTOS';
const SET_CURRENT = 'SET-CURRENT';
const SET_PHOTOS_TO_ADD = 'SET-PHOTOS-TO-ADD'

let initialState = {
    allPhotos:[],
    photoToAdd:null,
    current: 0
};

export const photoReducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_PHOTOS:
            return {...state, allPhotos: action.photos}

        case SET_CURRENT:
            return {...state, current: action.cur}
        
        case SET_PHOTOS_TO_ADD:
            return {...state, photoToAdd: action.photo}
    
        default:
            return state;
    }
}

export const setPhotosAC = (photos) => ({type: SET_PHOTOS, photos});
export const setPhotosToAddAC = (photo) => ({type: SET_PHOTOS_TO_ADD, photo});
export const setCurrentAC = (cur) => ({type: SET_CURRENT, cur});

export default photoReducer;