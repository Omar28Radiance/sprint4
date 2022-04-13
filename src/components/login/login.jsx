import React, {useEffect, useState } from "react";
import { fireStore, loginWithGoogle, logout, auth } from "./firebase/firebase";
import { AppContext } from "../../store/AppContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

export default function Login() {
    const {
        data,
        favs,
        isSearch,
        user,
        view,
        setData,
        setFavs,
        setIsSearch,
        setUser,
        setView
    } = usecontext(AppContext);

    <div className="App centered column">
              
       <Header />
       <section className="login">
         {user && (
           <div className='user-info'>
             <p>Hola {user.displayName}</p>
             <img src={user.photoURL} alt={user.displayName} />
           </div>
         )}
         <button className="btn-login" type="button" onClick={user ? logout : loginWithGoogle}>
           {user ? 'Cerrar' : 'Iniciar'} Sesión
         </button>
       </section>
       
       {user && (
          <Form 
            data={data} 
            setData={setData}
            user={user || {}} 
          />
        )}
       <section className="tweets">
         {isSearch ? <p>Cargando...</p> : null}
         <button type="button" onClick={() => setView("feed") }>Tweets</button>
         <button type="button" onClick={() => setView("favs") }>Favs</button>
         
         
         {(view === "feed" ? data : favs).map((item) => (
           <div className="tweet" key={item.id}>
             <div className="tweet-content">
               <p>{item.tweet}</p>
               <small>
                 <strong>@{item.author}</strong>
                 <br/>
                 <strong>{item.email}</strong>
               </small>
             </div>
             <div className="tweet-actions">
               <button
                 className="likes"
                 onClick={() => likeTweet(item.id, item.likes)}
               >
                 <img src={like} alt="" />
                 
                 <span>{item.likes || 0}</span>
               </button>
             </div>
             {
               (user !== null && user.uid === item.uid) && 
               <button className="delete" onClick={() => deleteTweet(item.id)}>
               X
              </button>
             }
           </div>
         ))}
       </section>
       <Footer />
     </div>
}

