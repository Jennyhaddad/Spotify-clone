import React, { useState, useEffect } from "react";
import { Stack, Typography, Slider, Box, IconButton } from "@mui/material";
import { formatTime } from "../../utils/formatTime";
import { PlayArrow, SkipNext, SkipPrevious, Pause } from '@mui/icons-material';

const PlayerControls = ({is_paused, duration, progress, player}) => {
    const [currentProgress, setCurrentProgress] = useState(progress);
    const skipSyle = {width: 28, height: 28};
    const playSyle = {width: 38, height: 38};


    useEffect(() =>{
         const intervalId = setInterval(() => {
        if(!is_paused && player) {
            setCurrentProgress((prevState) => prevState + 1);
        }
    }, 1000);
    return () => clearInterval(intervalId);
        }, [is_paused, player]);

    useEffect(() => {
        setCurrentProgress(progress);
    }, [progress]); 


    
    
    
    return ( 
        <Stack direction={'column'} spacing={2} justify="center" alignItems={"center"} sx={{ width: '100%'}}>
            <Stack spacing={1} direction="row" justifyContent={'center'} alignItems="center" sx={{ width: '100%'}}>
                <IconButton 
                size="small" 
                sx={{ color: 'text.primary'}}
                 onClick={() => { 
                    setCurrentProgress(0);
                    player.previousTrack();
                    }}
                >
                    <SkipPrevious sx={skipSyle}/>
                </IconButton>
                <IconButton size="small" sx={{ color: 'text.primary'}} 
                onClick={() => { 
                    player.togglePlay();
                    }}
                >
                {is_paused ? <PlayArrow sx= {playSyle}/> : <Pause sx= {playSyle}/> } 
                </IconButton>
                <IconButton size="small" sx={{ color: 'text.primary'}}>
                    <SkipNext sx={skipSyle}
                    onClick={() => { 
                        setCurrentProgress(0);
                        player.nextTrack();
                        }}
                    />
                </IconButton>
            </Stack>
            <Stack 
                spacing ={2} 
                direction="row" 
                justifyContent={'center'} 
                alignItems="center" 
                sx={{ width: '75%'}}>
                <Typography sx={{color: 'text.secondary', fontSize: 12}}> {formatTime(currentProgress)}</Typography>
                <Slider 
                    max={duration} 
                    value={currentProgress} 
                    min={0} size="medium"  
                    onChange={(event, value) => {
                         console.log( 'Changed', value);
                         setCurrentProgress(value);
                }}
                
                onChangeCommitted={(event, value) => {
                  player.seek(value * 1000);
                }}
                
                />
                <Typography sx={{color: 'text.secondary', fontSize: 12}}> {formatTime(duration)}</Typography>
            
            </Stack>
        </Stack> 
     );
    
    }

export default PlayerControls;