import React, { useEffect, useState } from "react";
import { fireStore, loginWithGoogle, logout, auth } from "./firebase/firebase";
import logobig from "../source/logobig.png";
import google from "../source/google.png";


<div className='logoutContainer'>

       <img className='logobig' src={logobig} />

       <h1 className='title1'>LOREM IPSUM DOLOR</h1>
       <h2 className='title2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>

       <div className='buttonContainer'>
         <div className='logoContainer'>
           <img className='logogoogle' src={google} />
         </div>
         <button className="login-btn" onClick={loginWithGoogle}>
           Sign in with Google
         </button>
       </div>

       <p className='likefooter'>2020 Devs_United - <span className='likefooter-beta'>BETA</span></p>

       <div className='likefooter-box'></div>

     </div>













// a partir de aqui comienza codigo de referencia para la pantalla previa a "loguearse"

//  {user ? (
//   <div className="containerFeed">

//     <div className="user-profile">

//       <img className="user-profile-pic" src={user.photoURL} alt="" />

//       <button className="login-btn-logout" onClick={logout}>
//         Logout
//         <img src={logoutlogo} className="login-btn-logout-img"/>
//       </button>

//     </div>

//     <form className="containerTweet" data={data} setData={setData}>

//       <p>¡Hola {user.displayName}!</p>

//       <textarea
//         name='tweet'
//         onChange={handleChange}
//         value={tweet.tweet}
//         cols="30"
//         rows="5"
//         placeholder='Ey! escribe tu tweet!'
//       />

//       <button className='sendtweet' onClick={handleSubmit}>POST</button>

//     </form>

//     <button className='btn-feed' type="button" onClick={() => setView("feed")}>Posts</button>
//     <button className='btn-favs' type="button" onClick={() => setView("favs")}>Favorites</button>

//     {isSearch ? <p>Cargando...</p> : null}

//     {(view === "feed" ? data : favs).map(item => (
//       <div className='tweetbox' key={item.id}>

//         <div className='containerPhotoTweet'>
//           <img src={user.photoURL} />
//         </div>

//         <div className='containerALLTweet'>

//           <div className='containerHeaderTweet'>

//             <p>{item.username}</p>

//             {
//               (user !== null && user.uid === item.uid) &&
//               <button className='delete' onClick={() => deleteTweet(item.id)}>
//                 <img src={trash} />
//               </button>
//             }

//           </div>

//           <p className='email'>{item.email}</p>

//           <p className='boxTweet'>{item.tweet}</p>

//           <span className='containerLikes'>
//             <img className='likesbtn' src={like} alt="" onClick={() => likeTweet(item.id, item.likes)}/>
//             <span className='likesCounter'>{item.likes || 0}</span>
//           </span>

//         </div>

//       </div>
//     ))}

//   </div>

//   ) : (

//     <div className='logoutContainer'>

//       <img className='logodevs' src={logobig} />

//       <h1 className='title1'>LOREM IPSUM DOLOR</h1>
//       <h2 className='title2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>

//       <div className='buttonContainer'>
//         <div className='logoContainer'>
//           <img className='logogoogle' src={logogoogle} />
//         </div>
//         <button className="login-btn" onClick={loginConGoogle}>
//           Sign in with Google
//         </button>
//       </div>

//       <p className='likefooter'>2020 Devs_United - <span className='likefooter-beta'>BETA</span></p>

//       <div className='likefooter-box'></div>

//     </div>
//   )}
