/**
 * Dependencies
 */
import React, { useEffect } from "react";

/**
 * Firebase
 */
 import { fireStore } from './firebase/firebase';


/**
 * Styles
 */
import "./index.css";

export default function App() {
  
  useEffect(()=> {
    fireStore.collection('tweets').get()
      .then((snapshot) => {
        snapshot.forEach(doc => {
          console.warn(doc.data());
        })
      });
  }, []);

  return (
    <div className="App centered column">
      <h1>Hello World</h1>
    </div>
  );
}
