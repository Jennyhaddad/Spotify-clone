import { Box, Button } from "@mui/material"
import React from "react";

const Home = () => {
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 4

        }}>
            <img src="/jh.png" alt="Jenny Haddad" style={{maxWidth: '40%', maxHeight: '40%'}} />
            <Button size="medium" variant="contained" href="null">
                Contact me
            </Button>
        </Box>
    )
    
}



export default Home;