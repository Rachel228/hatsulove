import React, {useEffect} from "react";
import style from "./LogIn.module.css";
import axios from "axios";

const LogIn = (props) => {
    
    const loginInput = React.createRef();
    const passwordInput = React.createRef();

    const onLoginChange = () =>{
        let text = loginInput.current.value;
        props.updateLoginText(text);
    }

    const onPassChange = () =>{
        let text = passwordInput.current.value;
        props.updatePasswordText(text);
    }

    const resetData = () => {
        props.setCurrentInterests([])
        props.setLikes([]);
    }
    
    const tryToLogIn = () => {
        if(props.login !== '' && props.password !== ''){
            axios.get(`http://localhost:3001/api/logInUser?login=${props.login}&password=${props.password}`)
            .then(response => {
                if(response.data[0]){
                    axios.get(`http://localhost:3001/api/getLoginedUser?id=${response.data[0].user_id}`)
                    .then(response => {
                        resetData();
                        props.logIn(response.data[0])
                        props.setLoginActive(false);
                    })
                }
            })
        }
    }

    if(props.loginedUserId === 0){
        return(
            <div className={props.loginActive ? style.LoginBlock+" "+style.active : style.LoginBlock }>
                <div className={style.form}>
                    <h3>Привіт, увійди у свій акаунт</h3>
                    <div className={style.input__container}>
                        <p>Логін:</p>
                        <input type="text" onChange={onLoginChange} ref={loginInput} className={style.loginInputs} />
                    </div>
                    <div className={style.input__container}>
                        <p>Пароль:</p>
                        <input type="password" onChange={onPassChange} ref={passwordInput} className={style.loginInputs} />
                    </div>
                    <button className={style.loginBtn} onClick={tryToLogIn}>Увійти</button>
                    <p className={style.loginText}>Не маєш профілю? <span to="/registration" onClick={() => {props.openRegisterModal()}}>Зареєструйся</span>! </p>
                </div>
            </div>
        )
    }
    else{
        return(
            <div>
            </div>
        )
    }
    
}

export default LogIn;