import React from "react";
import Card from "./Card";
import * as axios from 'axios'
import style from '../ProfilePage.module.css'

const Cards = (props) =>{
    
    let preText = props.loginedUserId===0 ? "Найпопулярніші профілі" : "Ці профілі можуть бути цікаві для Вас"

    const onCardClick = () => {
        props.setCurrentInterests([])
        props.setLikes([])
    }

    if(props.users.length === 0){

        let path;

        switch(props.wish){
            case "жіноча":
                path = "http://localhost:3001/api/femaleUserCards?from="+props.from+"&to="+props.to;
                break;

            case "чоловіча":
                path = "http://localhost:3001/api/maleUserCards?from="+props.from+"&to="+props.to;
                break;

            case "без різниці":
                path = "http://localhost:3001/api/otherUserCards?from="+props.from+"&to="+props.to;
                break;
                
            default:
                path = "http://localhost:3001/api/userCards";
                break;
        }
        
        axios.get(path).then(response => {
                    props.setUsers(response.data);
                });
    }
    

    let cards = props.users.map(p => (<Card setCurUser={props.setCurUser} onCardClick={onCardClick} profile={p}/>))
    return(
        <div>
            <h2 className={style.preText}>{preText}</h2>
            <div className={style.cardsGrid}>
                {cards}
            </div>
        </div>
    )
}
export default Cards;