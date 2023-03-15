import { combineReducers, createStore } from 'redux';
import {profileReducer} from './profile-reducer';
import { registerReducer } from './registration-reducer';
import { dialogsReducer } from './dialogs-reducer';
import {photoReducer} from './photo-reducer';


let reducers = combineReducers({
    profiles:profileReducer,
    registration:registerReducer,
    dialogs:dialogsReducer,
    photos:photoReducer
});

let store = createStore(reducers);

export default store;