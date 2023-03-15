import { NavLink } from 'react-router-dom'
import React, { useState } from 'react';
import style from './Header.module.css'

const Header = (props) => {
    let path = "/"+props.userId;
    const [popUpActive, setPopUpActive] = useState(false);

    const onButtonClick = () =>{
        props.logOut(0);
        setPopUpActive(false);
    }

    const resetSomeData = () => {
        props.setCurrentInterests([])
        props.setLikes([]);
        props.setCurUser(props.loginedUser);
    }

    return(
        <header>
            <NavLink to="/"><img src="/images/лого.png" className={style.logo} alt=""/></NavLink>
            {props.userId === 0 ?
            <button onClick={()=>{props.setLoginActive(!props.loginActive)}}>Увійти</button> :
            <div className={style.headerImageContainer}>
                <img onClick={()=>{setPopUpActive(!popUpActive)}} src={props.userImg} alt="" />
                <div className={popUpActive ? style.popUp+" "+style.active : style.popUp}>
                    <div className={style.profileBtn+" "+style.top}><h4 onClick={()=>setPopUpActive(false)}><NavLink onClick={()=>resetSomeData()} to={path}>Перейти в акаунт</NavLink></h4></div>
                    <div className={style.exit+" "+style.profileBtn+" "+style.bot}><h4 onClick={() => onButtonClick()}>Вийти</h4></div>
                </div>
            </div>}
        </header>
    )
}

export default Header