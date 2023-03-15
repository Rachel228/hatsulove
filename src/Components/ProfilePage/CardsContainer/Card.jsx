import React from "react";
import style from '../ProfilePage.module.css'
import { NavLink } from "react-router-dom";

const Card = ({profile, setCurUser, onCardClick}) =>{
    let path = `/` + profile.user_id;

    const f = () => {
        onCardClick();
        setCurUser(profile);
    }

    return(
        <div>
            <NavLink to={path} onClick={f} className={style.card}>
                <div className={style.card__Content}>
                    <img src={profile.way} alt="" />
                    <div className={style.rectangle}>
                        
                    </div>
                    <div className={style.card__Text}>
                        <h2>{profile.name}</h2>
                        <p>{profile.description}</p>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}
export default Card;