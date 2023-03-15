import "./Modal.css";
import React from "react";
import { useState } from "react";
import * as axios from "axios";

const RegistrationModal = (props) => {

    const [loading, setLoading] = useState(false)

    let fileInput = React.createRef();
    let regLoginInput = React.createRef();
    let regPasswordInput = React.createRef();
    let fromInput = React.createRef();
    let toInput = React.createRef();
    let nameInput = React.createRef();
    let genderSelect = React.createRef();
    let citySelect = React.createRef();
    let dateInput = React.createRef();
    let wishSelect = React.createRef();
    let heightInput = React.createRef();

    if(props.cities.length === 0){
        axios.get("http://localhost:3001/api/cities").then(response => {
            props.setCitiesArray(response.data);
        })
    }

    const onNameUpdate = () => {
        let text = nameInput.current.value;
        props.updateNameText(text);
    }
    const onLoginUpdate = () => {
        let text = regLoginInput.current.value;
        props.updateLoginText(text);
    }
    const onPasswordUpdate = () => {
        let text = regPasswordInput.current.value;
        props.updatePassText(text);
    }
    const onFromUpdate = () => {
        let text = fromInput.current.value;
        props.updateFromText(text);
    }
    const onToUpdate = () => {
        let text = toInput.current.value;
        props.updateToText(text);
    }
    const onWishUpdate = () => {
        let text = wishSelect.current.value;
        props.setWish(text);
    }
    const onGenderUpdate = () => {
        let gender = genderSelect.current.value;
        props.setCurrentGender(gender);
    }
    const onCityUpdate = () => {
        let city = citySelect.current.value;
        props.setCurrentCity(city)
    }
    const onDateUpdate = () => {
        let date = dateInput.current.value;
        props.updateDateText(date);
    }
    const onHeightUpdate = () => {
        let text = heightInput.current.value;
        props.updateHeightText(text);
    }

    const onFileUpload = async e => {

        const file = fileInput.current.files[0];
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
        props.setPhoto(imgFile.secure_url)
        setLoading(false)
    }

    const addUser = () => {
        let userId;
        let photoId;

        let user = props.user

        if(user.name !== '' && user.gender !== '' && user.city !== '' && user.date !== '' && user.height !== '' && user.login !== '' && user.password !== ''){
            props.setActive(false);

            axios.post("http://localhost:3001/api/setUser",{
                username:user.name,
                gender:user.gender,
                city_id:user.city,
                birth_date:user.date,
                height:user.height,
                login:user.login,
                password:user.password,
            }).then(response => {
                userId = response.data.insertId;
    
                axios.post("http://localhost:3001/api/setUserWish",{
                    userId: userId,
                    wish: props.user.wish,
                    from: props.user.from,
                    to: props.user.to
                    }).then(response => {});
    
                axios.post("http://localhost:3001/api/setPhoto",{
                userId:userId,
                way:props.user.photo,
                }).then(response => {
                    photoId = response.data.insertId;
    
                    axios.post("http://localhost:3001/api/setMainPhoto",{
                    userId:userId,
                    photoId:photoId,
                    }).then(response => {});
                });
            });
        }
        else{
            alert("Заповніть всі поля.")
        }
    }

    return(
        <div className="modal__registration">
            <div className="image__container">
                {loading ? 
                 <div className="Loader__container"><div className="lds-ring"><div></div><div></div><div></div><div></div></div><h3>Зачекайте, поки фотографія загружається</h3></div> :
                 <img src={props.user.photo} alt="main accout"/>}
                 {loading?null:<input onChange={onFileUpload} ref={fileInput} type="file"/>}

            </div>
            <div className="info__container">
                <div className="info__text">
                    <h3>Введіть, дані для анкети.</h3>
                    <h4>Будь ласка, будьте чесними.</h4>
                </div>
                <div className="info__input__container">
                    <p>Логін</p>
                    <input type="text" ref={regLoginInput} onChange={onLoginUpdate} className="register__input" placeholder="Логін" />
                </div>
                <div className="info__input__container">
                    <p>Пароль</p>
                    <input type="password" ref={regPasswordInput} onChange={onPasswordUpdate} className="register__input" placeholder={props.user.password}/>
                </div>
                <div className="info__input__container">
                    <p>Ім'я</p>
                    <input type="text" ref={nameInput} onChange={onNameUpdate} className="register__input" placeholder={props.user.name} />
                </div>
                <div className="info__input__container">
                    <p>Стать</p>
                    <select name="sex" ref={genderSelect} className="register__input" onChange={onGenderUpdate}>
                        <option value="Інша">Інша</option>
                        <option value="Чоловіча">Чоловіча</option>
                        <option value="Жіноча">Жіноча</option>
                    </select>
                </div>
                <div className="info__input__container">
                    <p>Дата народження</p>
                    <input ref={dateInput} value={props.user.date} className="register__input" onChange={onDateUpdate} type="date"/>
                </div>
                <div className="info__input__container">
                    <p>Місто проживання</p>
                    <select name="cities" ref={citySelect} className="register__input" onChange={onCityUpdate}>
                        {props.cities.map(city => {
                            return(<option value={city.city_id} key={city.city_id}>{city.name}</option>)
                        })}
                    </select>
                </div>
                
                <div className="info__input__container two__cols">
                    <p>Кого бажаєте бачити?</p>
                        <select name="wishGenders" ref={wishSelect} className="register__input" onChange={onWishUpdate}>
                            <option value="без різниці">Немає різниці</option>
                            <option value="чоловіча">Чоловіків</option>
                            <option value="жіноча">Жінок</option>
                        </select>
                    <p className="wishes__container">Віком від 
                        <input type="text" onChange={onFromUpdate} className="register__input" ref={fromInput} placeholder={props.user.from} maxLength="3"/> до 
                        <input type="text" onChange={onToUpdate} className="register__input" ref={toInput} placeholder={props.user.to} maxLength="3"/>
                    </p>
                </div>
                <div className="info__input__container info__input__center">
                    <p>Ріст</p>
                   <input type="text" ref={heightInput} className="register__input" onChange={onHeightUpdate} placeholder={props.user.height} />
                </div>
                <div className="btn__container">
                    <button className="register__btn" onClick={addUser}>Підтвердити</button>
                </div>
            </div>
        </div> 
    )
}

export default RegistrationModal