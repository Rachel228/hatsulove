import React, { useState } from 'react';
import style from '../ProfilePage.module.css'
import * as axios from "axios";
import { NavLink } from 'react-router-dom';


const Profile = (props) => {

    let descriptionRef = React.createRef();
    let age = new Date().getFullYear() - props.currentProfile.birth_date.split('-')[0] 

    const [editActive, setEditActive] = useState(false);
    const [loading, setLoading] = useState(false)

    const photoInput = React.createRef();

    const onPhotoUpload = async e => {
        const file = photoInput.current.files[0];
        const data = new FormData();
        data.append('file', file)
        data.append('upload_preset', 'Hatsu_profileImages')
        
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/didw9zkq6/image/upload',
            {
                method: 'POST',
                body: data
            }
        )

        const imgFile = await res.json()
        props.setPhotosToAdd(imgFile.secure_url)
        setLoading(false)
        
    }

    const addPhoto = () => {
        if(props.photoToAdd){
            axios.post("http://localhost:3001/api/setPhoto",{
                userId:props.currentProfile.user_id,
                way:props.photoToAdd,
                }).then(response => {
                    props.setPhotosToAdd(null)
                });
        }
    }

    const changeDescription = () => {
        
        addPhoto();

        axios.put("http://localhost:3001/api/updateDescription",{
                user_id: props.loginedUser.user_id,
                description: props.descText,
                }).then(response => {
                    props.reRenderUserInfo()
                    setEditActive(false);
                });
    }

    const reRenderCurInterests = () => {
        axios.get("http://localhost:3001/api/curInterests?user_id="+props.currentProfile.user_id).then(response => {
            if(response.data.length === 0){
                props.setCurrentInterests([{interest_id:0, name:"відсутні"}]);
            }
            else{
                props.setCurrentInterests(response.data);
            }    
        });
    }

    const reRenderLikes = () => {
        axios.get("http://localhost:3001/api/likes?who_id="+props.loginedUser.user_id).then(response => {
            if(response.data.length === 0){
                props.setLikes([{like_id:0}]);
            }
            else{
                props.setLikes(response.data);
            }      
        });
    }

    if(props.userLikes.length === 0){
        reRenderLikes();
    }

    if(props.currentInterests.length === 0){
        reRenderCurInterests();
    }

    const onInterestAdd = intId => {
        axios.post("http://localhost:3001/api/setInterest",{
                userId: props.loginedUser.user_id,
                interestId: intId,
                }).then(response => {reRenderCurInterests()});
        
    }

    const onInterestDelete = intId => {
        axios.delete(`http://localhost:3001/api/deleteInterest?userId=${props.loginedUser.user_id}&interestId=${intId}`)
        .then(response => {reRenderCurInterests()});
        
    }

    const openEditing = () => {
        props.updateProfileDescription(props.currentProfile.description);
        setEditActive(true)
    }

    const updateDescriptionText = () =>{
        let text = descriptionRef.current.value;
        props.updateProfileDescription(text);
    }

    const onOpenModalClick = () => {
        props.setPhotos([]);
        props.setCurrent(0);
        props.openSliderModal();

    }

    const like = () => {
        axios.post("http://localhost:3001/api/setLike",{
                who_id: props.loginedUser.user_id,
                whom_id: props.currentProfile.user_id,
                }).then(response => {
                    axios.put("http://localhost:3001/api/updateLikesCount",{
                    user_id: props.currentProfile.user_id,
                    count_likes: props.currentProfile.count_likes+1,
                    }).then(response => {
                        reRenderLikes();
                    });
                });
    }

    const dislike = () => {
        axios.delete(`http://localhost:3001/api/deleteLike?who_id=${props.loginedUser.user_id}&whom_id=${props.currentProfile.user_id}`)
        .then(response => {
            axios.put("http://localhost:3001/api/updateLikesCount",{
                user_id: props.currentProfile.user_id,
                count_likes: props.currentProfile.count_likes-1,
                }).then(response => {
                    reRenderLikes();
                });
        });
    }

    return(
        <div className={style.profileGridAll}>
            <div className={style.profileGrid}>
                <div className={style.imgContainer}>
                    <img src={props.currentProfile.way} className={style.profilePic} alt="" />
                    {editActive ?
                        <div className={style.blackScreen+" "+style.active} >
                            <input type="file" className={style.blackInput} ref={photoInput} onChange={onPhotoUpload} />
                            <h3>Додати фотокартки</h3>
                        </div> :
                        <div onClick={()=> onOpenModalClick()} className={style.blackScreen}>
                            <h3>Переглянути галерею</h3>
                        </div>
                    }
                </div>
                <div className={style.profileInfo}>
                    <h2>{props.currentProfile.name}</h2>
                    <p>Ріст: <span>{props.currentProfile.height}</span></p>
                    <p>Вік: <span>{age}</span></p>
                    <p>Стать: <span>{props.currentProfile.sex}</span></p>
                    <p>Про себе: </p>
                    {editActive ? <textarea onChange={updateDescriptionText} className={style.infoTextarea} value={props.descText} rows="5" maxlength ="300" ref={descriptionRef}></textarea> :
                    <p>{props.currentProfile.description}</p>}
                </div>
            </div>
            
            <div className={style.interests}>
                <div className={style.inter0}>
                    <p>Інтереси: </p>
                </div>

                {editActive ?
                props.allInterests.map(interest => {
                    if(interest.isActive){
                        return(
                            <div className={style.inter+" "+style.active}>
                                <p onClick={()=>{onInterestDelete(interest.interest_id)}}>{interest.name}</p>
                            </div>
                        )
                    }
                    else{
                        return(
                            <div className={style.inter}>
                                <p onClick={()=>{onInterestAdd(interest.interest_id)}}>{interest.name}</p>
                            </div>
                        )
                    }
                }):
                props.currentInterests.map(interest => (
                    <div className={style.inter+" "+style.active}>
                        <p>{interest.name}</p>
                    </div>
                ))}

            </div>
            <div className={style.profilePopularity}>
                {props.loginedUser.user_id === 0 ?
                    <div></div> :
                    props.loginedUser.user_id === props.currentProfile.user_id ?
                    <h3>Ваша популярність: {props.currentProfile.count_likes}❤</h3> :
                    !props.currentProfile.liked ? 
                    <button onClick={()=>like()} className={style.profilePopularityBtn}><h3><img className={style.heart} src="images/svg/heart_empty.svg" alt="" /></h3></button> :
                    <button onClick={()=>dislike()} className={style.profilePopularityBtn}><h3><img className={style.heart} src="images/svg/heart_fill.svg" alt="" /></h3></button>
                }

                {props.currentProfile.user_id === props.loginedUser.user_id ? 
                (editActive?<button onClick={()=>changeDescription()} className={style.editProfileBtn}>Зберегти</button>:
                <button className={style.editProfileBtn} onClick={()=>openEditing()}>Редагувати профіль</button>) :
                props.loginedUser.user_id !== 0 ? 
                <NavLink to="/dialogs" onClick={()=>props.setDialogs([])} className={style.messageBtn}><h3>Написати</h3></NavLink> :
                <div></div>}

            </div>
            {loading && (
            <div className={style.loading}>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div><h1>Зачекайте, іде загрузка фото</h1>
            </div>)}
        </div>
    )
   
}

export default Profile;