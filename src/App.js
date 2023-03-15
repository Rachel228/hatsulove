import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import HeaderContainer from './Components/Header/HeaderContainer';
import ProfilePageContainer from './Components/ProfilePage/ProfilePageContainer';
import CardsContainer from './Components/ProfilePage/CardsContainer/CardsContainer';
import LogInContainer from './Components/LogIn/LogInContainer';
import RegistrationContainer from './Modal/RegistrationContainer';
import DialogContainer from './Components/Dialog/DialogContainer';
import GallerySliderContainer from './Modal/GallerySlider/GallerySliderContainer'
import Modal from './Modal/Modal'

function App(props) {

const [modalActive, setModalActive] = useState(false);
const [loginActive, setLoginActive] = useState(false);
const [modalSwitch, setmodalSwitchActive] = useState(false);

  const openSliderModal = () => {
    setmodalSwitchActive(true)
    setModalActive(true)
  }

  const openRegisterModal = () => {
    setmodalSwitchActive(false)
    setModalActive(true)
  }

  return (
    <Router>
      <div className="AppWrapper">
        <HeaderContainer loginActive={loginActive} setLoginActive={setLoginActive} store={props.store} />
        <section className="ContentSect">
          <ProfilePageContainer openSliderModal={openSliderModal} store={props.store} />
          <Route exact path='/' render={() => <CardsContainer store={props.store}/>}/>
          <Route path='/dialogs' render={() => <DialogContainer store={props.store} />}/>
        </section>
      </div>

      <LogInContainer openRegisterModal={openRegisterModal} loginActive={loginActive} setLoginActive={setLoginActive} setModalActive={setModalActive} store={props.store} />
      <Modal active={modalActive} setActive={setModalActive}>
        { modalSwitch ? 
        <GallerySliderContainer setActive={setModalActive} store={props.store}/> :
        <RegistrationContainer setActive={setModalActive} store={props.store}/>}
      </Modal>
      
    </Router>
  );
}

export default App;
