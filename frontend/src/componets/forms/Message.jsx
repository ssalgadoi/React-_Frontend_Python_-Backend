import * as React from 'react';
import { Box, Typography } from '@mui/material';


export default function Message({
    messageText,
    messagecolor }) {


    return (
        <>
            <Box sx={{
                width: '100%',
                height: '40px',
                color:'white',
                marginBottom: '30px',
                padding: '10px',
                display: 'flex',
                backgroundColor: messagecolor,
                alingItems:'center'
            }}
            >
                <Typography>{ messageText }</Typography>
            </Box>
        </>

    );
}
