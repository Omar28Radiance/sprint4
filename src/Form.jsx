/**
 * Dependencies
 */
import React from "react";

/**
 * Components
 */
import Button from "./components/button/Button";

/**
 * Hooks
 */
import useForm from "./useForm";

/**
 * Others
 */
import { fireStore } from "./firebase/firebase";

const Form = ({
    data = [],
    setData
}) => {

    const [value, handleInput, setValue] = useForm({
        tweet: "",
        author: ""
    });

    const { tweet, author } = value;

    function handleSubmit(e) {
        e.preventDefault()
        //Adding tweets
        const addTweet = fireStore.collection("tweets").add(value);
        //obtenemos referencia del documento recien creado
        const getDoc = addTweet.then(doc => (doc.get()))
        //Getting tweets
        getDoc.then(doc => {
            const currentTweet = {
                tweet: doc.data().tweet,
                author: doc.data().author,
                id: doc.id
            };

            setData([currentTweet, ...data]);
        });

        setValue({ tweet: "", author: "" });
    }

    return (
        <form className="tweet-form">
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
            <Button
                className="btn-tweet"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </form>
    )
}

export default Form