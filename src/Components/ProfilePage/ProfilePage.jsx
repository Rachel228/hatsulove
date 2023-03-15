import React , {useEffect} from 'react'
import Profile from './Profile/Profile';
import * as axios from 'axios'
import {
    Route
  } from "react-router-dom";

  const ProfilePage = (props) => {

    useEffect(() => {
        const timer = setTimeout(() => {reRenderUserInfo()}, 1000);
        return () => clearTimeout(timer);
    });

    let reRenderUserInfo = () => {
        axios.get("http://localhost:3001/api/getAllUsers").then(response => {
            props.setAllUsers(response.data);
        });
    }

    if(props.allUsers.length === 0){
        reRenderUserInfo()
    }

    if(props.allInterests.length === 0){
        axios.get("http://localhost:3001/api/allInterests").then(response => {
            props.setAllInterests(response.data);
        });
    }

    let profiles = props.allUsers.map(user => <Route path={"/"+user.user_id} render={() => 
    <Profile setCurrentInterests={props.setCurrentInterests} 
        currentInterests={props.currentInterests} 
        allInterests={props.allInterests} 
        descText={props.descText} loginedUser={props.loginedUser} 
        updateProfileDescription={props.updateProfileDescription} 
        currentProfile={user} reRenderUserInfo={reRenderUserInfo}
        updateLoginedDescription={props.updateLoginedDescription}
        userLikes={props.userLikes} setLikes={props.setLikes}
        setDialogs={props.setDialogs} openSliderModal={props.openSliderModal}
        setPhotos={props.setPhotos} setCurrent={props.setCurrent}
        setPhotosToAdd={props.setPhotosToAdd} photoToAdd={props.photoToAdd}/>}/>)

    return(
        <div>
            {profiles}
        </div>
    )
}

export default ProfilePage