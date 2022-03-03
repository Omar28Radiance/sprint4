/**
 * Dependencies
 */
import React, { useEffect, useState } from "react";
import Form from "./Form";

/**
 * Firebase
 */
import { fireStore } from './firebase/firebase';


/**
 * Styles
 */
import "./index.css";

export default function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fireStore.collection('tweets').get()
      .then((snapshot) => {
        const tweets = [];
        snapshot.forEach(doc => {
          const snap = {
            tweet: doc.data().tweet,
            author: doc.data().author,
            id: doc.id
          };

          tweets.push(snap)

        });
        setData(tweets)

      });
  }, []);

  const deleteTweet = (id) => {
    //Filtramos nuestro state con el documento que ya no
    // necesitamos con Array.filter
    const updatedTweets = data.filter((tweet) => {
      return tweet.id !== id;
    });

    //Actualizamos nuestro state con el array actualizado
    setData(updatedTweets);

    //Borramos documento de Firebase
    fireStore.doc(`tweets/${id}`).delete();
  };

  return (
    <div className="App centered column">
      <Form data={data} setData={setData} />
      <section className='tweets'>
        {
          data.map(item => (
            <div className='tweet' key={item.id} >
              <div className="tweet-content">
                <p>{item.tweet}</p>
                <small>
                  <strong>@{item.author}</strong>
                </small>
              </div>
              <div className='tweet-actions'>
              </div>
              <button className="delete" onClick={() => deleteTweet(item.id)} >X</button>
            </div>
          ))
        }
      </section>
    </div>
  );
}
