import React from 'react'
import style from "./GallerySlider.module.css"
import axios from 'axios'
import { useState } from 'react'

const GallerySlider = (props) => {

  const reRenderAllPhotos = () => {
    axios.get("http://localhost:3001/api/userGallery?user_id="+props.currentProfile.user_id).then(response => {
            response.data.length === 0 ?
                props.setPhotos([{photo_id:0}]) :
                props.setPhotos(response.data)    
        });
  }

  const length = props.allPhotos.length;

  const nextSlide = () => {
    props.setCurrent(props.current === length - 1 ? 0 : props.current + 1)
  }

  const prevSlide = () => {
    props.setCurrent(props.current === 0 ? length-1 : props.current - 1)
  }

  if(props.allPhotos.length === 0){
    reRenderAllPhotos();
  }

  const changeMainPhoto=(photo_id)=>{

    axios.put("http://localhost:3001/api/updateMainPhoto",{
      user_id: props.loginedUser.user_id,
      photo_id: photo_id,
      }).then(response => {
          axios.get(`http://localhost:3001/api/getLoginedUser?id=${props.loginedUser.user_id}`)
                    .then(response => {
                        props.logIn(response.data[0]);
                    })
        props.setActive(false)
      });
  }

  let photos = props.allPhotos.map((photo, index) => {
    return(
      <div className={index===props.current ? style.slide+" "+style.active : style.slide} key={index}>
        {index === props.current && (
            <img src={photo.way} alt="" className={style.galleryPhoto} />
        )}
            {props.loginedUser.user_id === props.currentProfile.user_id && (
              <button onClick={()=>changeMainPhoto(photo.photo_id)} 
              className={index===props.current ? style.slideBtn+" "+style.active : style.slideBtn}>Зробити головним фото</button>
            )}
      </div>
    )
  })

  return(
    <section className={style.slider}>
      {length > 1 && (<div className={style.arrowsContainer}>
        <div className={style.arrow+" "+style.left} onClick={()=>prevSlide()}><img src="images/arrow_left.png" alt="" /> </div>
        <div className={style.arrow+" "+style.right} onClick={() => nextSlide()}><img src="images/arrow_right.png" alt="" /></div>
      </div>)}
      {photos}
    </section>
  )
}

export default GallerySlider;
