import React, {useState, useEffect} from "react";
import {getPosts, deletePost} from "../services/postService";

export default function Posts(){
    const [posts, setPosts] = useState([])

    useEffect(()=>{
   getPosts()
       .then(response => setPosts(response.data))
       .catch(err => console.log(err));
   }, []);

    //handlers
    const handleDelete = (id) => {
            deletePost(id)
            .then(response => setPosts(posts.filter(post => post.id !== id))
            )
            .catch(err => console.log(err));
    }

    return(
        <div>
            <h1>Posts</h1>
            <ul>
                {
                    posts.map(post =>(
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </li>
                        )

                    )
                }
                <li></li>
            </ul>
        </div>
    );
}