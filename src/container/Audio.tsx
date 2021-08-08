import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import audio_play from '../../public/img/music_on.png'
import audio_mute from '../../public/img/music_off.png'

const Audio = () => {
    const audio = useRef<any>()
    const [toggle, setToggle] = useState<boolean>(true);

    const handleMusic = () => {
        setToggle(!toggle)
    }

    useEffect(()=>{
        toggle ? audio.current.play() : audio.current.pause()
    },[toggle])

    return (
        <>
            {
                toggle ? <Image width={30} height={30} src={audio_mute} onClick={handleMusic}/> : <Image width={30} height={30} src={audio_play} onClick={handleMusic}/>
            }
            <audio autoPlay loop ref={audio} style={{backgroundColor: "black"}} >
                <source src="https://s3.ap-northeast-2.amazonaws.com/breezm.com/movies/mobile/music.mp3"/>
            </audio>
        </>
    );
};

export default Audio;