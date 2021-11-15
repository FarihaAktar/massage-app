import { Button, Grid, TextField } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import NewsFeed from './NewsFeed'

const CreatePost = () => {
    const [post, setPost] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSubmit = (e) => {
        // console.log(post);
        const newPost = {
            status: post,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        }
        const url = "http://localhost:4000/addPost"
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(result => {
                console.log('result', result)
            })
        e.preventDefault()
    }



    const handleDelete = useCallback(
        (id) => {
            fetch('http://localhost:4000/delete/' + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(result => {
                    console.log('deleted', result)
                })

        },
        [],
    )

    useEffect(() => {
        console.log('effect')
        fetch('http://localhost:4000/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [posts])

    return (
        // create post area
        <div >
            <div style={{ width: "75%", margin: "20px auto", padding: 10, boxShadow: '1px 1px 5px #88888' }}>
                <h4>Create Your Post</h4>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id='filled-full-width'
                        variant='filled'
                        fullWidth
                        multiline
                        placeholder="What's on your mind?"
                        rows={4}
                        value={post}
                        onChange={(e) => setPost(e.target.value)} />

                    <Grid
                        container
                        direction='row'
                        justifyContent='flex-end'>

                        <Button type='submit' style={{ marginTop: 10 }} variant='contained' color='primary'>Publish</Button>

                    </Grid>
                </form>
            </div>


            {/* news feed container */}

            <div style={{ position: 'relative', overflow: 'auto', maxHeight: 300, padding: 20, width: '75%', margin: '40px auto' }}>
                {
                    posts.map(post => <NewsFeed key={post._id} post={post} handleDelete={handleDelete}></NewsFeed>)
                }

            </div>



        </div>
    )
}

export default CreatePost
