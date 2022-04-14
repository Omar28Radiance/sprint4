 import React, { useEffect, useState } from "react";

 import Form from "./Form";
 import Header from "./components/header/Header";
 import Footer from "./components/footer/Footer";
 
 import { fireStore, loginWithGoogle, logout, auth } from "./firebase/firebase";
 
 import "./index.css";
 import like from "./components/source/like.svg";
 import logobig from "./components/source/logobig.png";
 import pase from "./components/source/logout.png";
 
 export default function App() {
   const [data, setData] = useState([]);
   const [favs, setFavs] = useState([]);
   const [view, setView] = useState("feed");
   const [isSearch, setIsSearch] = useState(false);
   const [user, setUser] = useState(null);
   
   useEffect(() => {
 
     setIsSearch(true)
     
     const desuscribir = fireStore
       .collection("tweets")
       .onSnapshot((snapshot) => {
         const tweets = [];
         snapshot.forEach((doc) => {
           const {
             tweet,
             author,
             email,
             uid,
             likes
            } = doc.data();
            
           const snap = {
             tweet,
             author,
             id: doc.id,
             email,
             uid,
             likes
           };
           tweets.push(snap);
         });
         setData(tweets);
         setFavs(tweets.filter(item => {
           return item.likes > 0;
         }))
         setIsSearch(false)
       });
       
       auth.onAuthStateChanged((user) => {
         console.warn('LOGGED WIDTH:', user);
         setUser(user);
       });
       
     return () => {
       desuscribir();
     };
   }, []);
 
 
 
   const deleteTweet = (id) => {
     
     const userConfirm = window.confirm("¿Estás seguro que quieres eliminar este hermoso Tweet?");
 
     if (userConfirm) {
       
       const updatedTweets = data.filter((tweet) => {
         return tweet.id !== id;
       });
       
       setData(updatedTweets);
 
       fireStore.doc(`tweets/${id}`).delete();
     }
 
   };
 
   function likeTweet(id, likes) {
     const innerLikes = likes || 0;
     fireStore.doc(`tweets/${id}`).update({ likes: innerLikes + 1 });
   };

   return (
     <div className="App centered column">
       
       { user && (<Header />)}
       <section className="login">
         {user && (
           <div className='user-info'>
             <p>Hola {user.displayName}</p>
             <img src={user.photoURL} alt={user.displayName} />
           </div>
         )}
         <button className="btn-login" type="button" onClick={user ? logout : loginWithGoogle}>
           {user ? 'Cerrar' : 'Iniciar'} Sesión
           <img alt="entrada/salida" src={pase}/>
         </button>
         {user === null && 
         (<div className="containerlogout">
           <h1 className="title1">DEV'S united</h1>
         <img alt="felicidad" src={logobig}/>
         </div>)}
       </section>
       
       {user && (
          <Form 
            data={data} 
            setData={setData}
            user={user || {}} 
          />
        )}
       <section className="tweets">
         { isSearch ? <p>Cargando...</p> : null}
         { user && (<button className="btn-feeding" type="button" onClick={() => setView("feed") }>Tweets</button>)}
         { user && (<button className="btn-favorites" type="button" onClick={() => setView("favs") }>Favs</button>)}
         
         { user && (view === "feed" ? data : favs).map((item) => (
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
       {user && (<Footer />)}
     </div>
   );
 }
