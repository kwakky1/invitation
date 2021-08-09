import React, {useEffect, useRef, useState} from 'react';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import {useRecoilValue} from "recoil";
import {themeModeState} from "../atoms/Atom";

const Audio = () => {
    const audio = useRef<any>()
    const [toggle, setToggle] = useState<boolean>(true);
    const themeMode = useRecoilValue<boolean>(themeModeState)
    const handleMusic = () => {
        setToggle(!toggle)
    }

    useEffect(()=>{
        toggle ? audio.current.play() : audio.current.pause()
    },[toggle])

    return (
        <>
            {
                toggle ? <VolumeUpIcon style={{color: themeMode ? 'white' : 'grey' }} onClick={handleMusic}/> : <VolumeOffIcon style={{color: themeMode ? 'white' : 'grey' }} onClick={handleMusic}/>
            }
            <audio autoPlay loop ref={audio} style={{backgroundColor: "black"}} >
                <source src="https://s3.ap-northeast-2.amazonaws.com/breezm.com/movies/mobile/music.mp3"/>
            </audio>
        </>
    );
};

export default Audio;