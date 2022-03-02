import React from 'react'
import useForm from './useForm'
import {fireStore} from "./firebase/firebase";

const Form = ({
    data=[],
    setData
}) => {

   const [value,handleInput,setValue]=useForm({
        tweet:"",
        author:""
    })

    const {tweet,author} = value;

    function handleSubmit(e) {
        e.preventDefault()
        //Adding tweets
        const addTweet = fireStore.collection("tweets").add(value)
        const getDoc = addTweet.then(doc=> (doc.get()))
        //Getting tweets
        getDoc.then(doc => {
            const currentTweet={
                tweet: doc.data().tweet,
                author: doc.data().author,
                id: doc.id
            }
            setData([
                currentTweet,
                ...data
            ])
        })

        setValue({
            tweet:"",
            author:""
        })
         
    }

  return (
    <form>
        <textarea
            name='tweet'
            value={tweet}
            onChange={handleInput}

        
        >
        </textarea>
        <input 
            name='author'
            placeholder='Author'
            value={author}
            onChange={handleInput}
        />
        <button onClick={handleSubmit} >Submit</button>
    </form>
  )
}

export default Form