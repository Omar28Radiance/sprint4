/**
 * Dependencies
 */
import React, { useEffect,useState } from "react";
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
  const [data,setData] = useState([])
  useEffect(()=> {
    fireStore.collection('tweets').get()
      .then((snapshot) => {
        console.log(snapshot)
        const tweets = []
        snapshot.forEach(doc => {
          const snap={
            tweet: doc.data().tweet,
            author: doc.data().author,
            id: doc.id

          }
          tweets.push(snap)

        })
        setData(tweets)

      });
  }, []);

  return (
    <div className="App centered column">
      <h1>Hello World</h1>
      <Form data={data} setData={setData}/>
      {
        data.map(item=>(
          <div key={item.id} >
            <p>{item.tweet}</p>
            <p>
              Author
              <strong>{item.author}</strong>
            </p>
            <hr/>
          </div>
        ))
      }
    </div>
  );
}
