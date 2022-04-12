/**
 * Dependencies
 */
 import React, { useEffect, useState } from "react";

 /**
  * Components
  */
 import Form from "./Form";
 import Header from "./components/header/Header";
 import Footer from "./components/footer/Footer";
 
 /**
  * Firebase
  */
 import { fireStore, loginWithGoogle, logout, auth } from "./firebase/firebase";
 // en import se agregaron los valores de "loginConGoogle", "auth" & "logout"
 /**
  * Styles
  */
 import "./index.css";
 import like from "./like.svg";
//  import google from "./source/google(1).png"
//  import logout from "./source/logout.png"
 
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
       //Filtramos nuestro state con el documento que ya no
       // necesitamos con Array.filter
       const updatedTweets = data.filter((tweet) => {
         return tweet.id !== id;
       });
       //El codigo previo de updatedTweets se coloca dentro del useconfirm.
 
 
       //Actualizamos nuestro state con el array actualizado
       setData(updatedTweets);
 
       //Borramos documento de Firebase
       fireStore.doc(`tweets/${id}`).delete();
     }
 
   };
 
   /**
    *@description Funcion que actualiza likes en base de datos
    */
 
   function likeTweet(id, likes) {
     const innerLikes = likes || 0;
     fireStore.doc(`tweets/${id}`).update({ likes: innerLikes + 1 });
   };

   return (
     <div className="App centered column">
       {/** a partir de aqui comeinza codigo de referencia para la pantalla previa a "loguearse"*/}
       {/* 
       {user ? ( 
        <div className="containerFeed">
          
          <div className="user-profile">
            
            <img className="user-profile-pic" src={user.photoURL} alt="" />
            
            <button className="login-btn-logout" onClick={logout}>
              Logout
              <img src={logoutlogo} className="login-btn-logout-img"/>
            </button>
          
          </div>

          <form className="containerTweet" data={data} setData={setData}>
          
            <p>¡Hola {user.displayName}!</p>

            <textarea
              name='tweet'
              onChange={handleChange}
              value={tweet.tweet}
              cols="30"
              rows="5"
              placeholder='Ey! escribe tu tweet!' 
            />

            <button className='sendtweet' onClick={handleSubmit}>POST</button>

          </form>

          <button className='btn-feed' type="button" onClick={() => setView("feed")}>Posts</button>
          <button className='btn-favs' type="button" onClick={() => setView("favs")}>Favorites</button>

          {isSearch ? <p>Cargando...</p> : null}

          {(view === "feed" ? data : favs).map(item => (
            <div className='tweetbox' key={item.id}>

              <div className='containerPhotoTweet'>
                <img src={user.photoURL} />
              </div>

              <div className='containerALLTweet'>

                <div className='containerHeaderTweet'>
                  
                  <p>{item.username}</p>


                  {
                    (user !== null && user.uid === item.uid) &&
                    <button className='delete' onClick={() => deleteTweet(item.id)}>
                      <img src={trash} />
                    </button>
                  }

                </div>

                <p className='email'>{item.email}</p>

                <p className='boxTweet'>{item.tweet}</p>

                <span className='containerLikes'>
                  <img className='likesbtn' src={like} alt="" onClick={() => likeTweet(item.id, item.likes)}/>
                  <span className='likesCounter'>{item.likes || 0}</span>
                </span>

              </div>


            </div>
          ))}

            
        </div>
        
        
        ) : (

          <div className='logoutContainer'>

            <img className='logodevs' src={logobig} />

            <h1 className='title1'>LOREM IPSUM DOLOR</h1>
            <h2 className='title2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>

            <div className='buttonContainer'>
              <div className='logoContainer'>
                <img className='logogoogle' src={logogoogle} />
              </div>
              <button className="login-btn" onClick={loginConGoogle}>
                Sign in with Google
              </button>
            </div>

            <p className='likefooter'>2020 Devs_United - <span className='likefooter-beta'>BETA</span></p>

            <div className='likefooter-box'></div>


          </div>
        )} */}
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
       {/* {user && <Form data={data} setData={setData} />} */}
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
         
         {/* {data.map((item) => ( */}
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
                 {/* <span>{item.likes ? item.likes : 0}</span> */}
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
   );
 }
//En lineas superiores el usuario debe ser validado tanto si tiene un uid valido asi como que el usuario siempre esté logueado, puesto que en un inicio user inicia como null, pues no hay una sesión activa. El codigo leerá si primero el usuario/objeto no es null y despues si las propiedades coincidan.