import { Button, Grid, Paper } from '@material-ui/core'
import React from 'react'

const NewsFeed = ({ post, handleDelete }) => {
    const { status, date, time, _id } = post;
    return (
        <Paper style={{ padding: 10 }}>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <h5>{status}</h5>
                <div>
                    <p>{date}</p>
                    <p>{time}</p>
                </div>
            </div>
            <Grid
                container
                justifyContent='flex-end'
                direction='row'>

                <Button onClick={() => handleDelete(_id)} variant='contained' color='secondary'>Delete</Button>
            </Grid>
        </Paper>
    )
}

export default NewsFeed
