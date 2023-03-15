import React, { useEffect } from 'react';
import style from './Dialog.module.css';
import axios from 'axios';

const Dialog = (props) => {

    const messageArea = React.createRef();

    const reRenderDialogs = () =>{
        axios.get(`http://localhost:3001/api/getDialogs?from_id=${props.loginedUser.user_id}&to_id=${props.currentProfile.user_id}`)
                    .then(response => {
                        response.data.length === 0 ?
                        props.setDialogs([{dialog_id:0}]) :
                        props.setDialogs(response.data)
                    })
    }

    useEffect(() => {
        const timer = setTimeout(() => {reRenderDialogs()}, 1000);
        return () => clearTimeout(timer);
    });

    const onMessageUpdate = () => {
        let text = messageArea.current.value;
        props.updateCurrentMessageText(text);
    }

    console.log(new Date());

    const sendMessage = () => {
        axios.post(`http://localhost:3001/api/sendMessage`,{
            from_id:props.loginedUser.user_id,
            to_id:props.currentProfile.user_id,
            send_time:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            message: props.currentMessage,
        })
            .then(response => {
                reRenderDialogs();
                props.updateCurrentMessageText('');
            })
    }

    if(props.allDialogs.length === 0){
        reRenderDialogs();
    }

    let messages

    if(props.loginedUser.user_id !== 0 && props.currentProfile.user_id !== 0){
        messages = props.allDialogs.map(dialog => {
            if (dialog.from_id === props.loginedUser.user_id && dialog.to_id === props.currentProfile.user_id)
                return(
                    <div className={style.etireWidth}>
                        <div className={style.message+" "+style.right} title={dialog.send_time}>
                            <p>{dialog.message}</p>
                        </div>
                    </div>
                    
                )
            else if(dialog.from_id === props.currentProfile.user_id && dialog.to_id === props.loginedUser.user_id){
                return(
                    <div className={style.etireWidth}>
                        <div className={style.message+" "+style.left} title={dialog.send_time}>
                            <p>{dialog.message}</p>
                        </div>
                    </div>
                )
            }
            else return null
        })
    }

    return(
        <div>
            {props.loginedUser.user_id === 0 ?
            <div><h3>Будь ласка, залогіньтесь</h3></div> :
            props.currentProfile.user_id !== 0 ?
            <div className={style.dialogWrapper}>
                <section className={style.messagesContainer}>
                    {messages}
                </section>
                <section className={style.sendMessageWrapper}>
                    <textarea ref={messageArea} cols="30" rows="10" onChange={()=>onMessageUpdate()} value={props.currentMessage} className={style.sendMessageArea}></textarea>
                    <button className={style.sendMessageBtn} onClick={()=>sendMessage()}>Відправити</button>
                </section>
            </div> :
            <div><h3>Будь ласка, виберіть співрозмовника</h3></div>}
        </div>
    )
}

export default Dialog