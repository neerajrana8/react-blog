import React, {useState, useEffect} from "react";
import {getPosts, deletePost, updatePost} from "../services/postService";
import PostForm from "./PostForm";

export default function Posts(){
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);

    useEffect(()=>{
   getPosts()
       .then(response => setPosts(response.data))
       .catch(err => console.log(err));
   }, []);

    //handlers
    const handleDelete = (id) => {
            deletePost(id)
            .then(() => setPosts(posts.filter(post => post.id !== id))
            )
            .catch(err => console.log(err));
    }

    const handleEdit = (post) => {
        setEditingPost(post);
    }

    return(
        <div>
            <h1>Posts</h1>
            <PostForm posts={posts} setPosts={setPosts} editingPost={editingPost} setEditingPost={setEditingPost}></PostForm>
            <ul>
                {
                    posts.map(post =>(
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                            <button onClick={() => handleEdit(post)}> Edit</button>
                        </li>
                        )

                    )
                }
                <li></li>
            </ul>
        </div>
    );
}