import {useEffect, useState} from "react";
import {Box, Button, Container, Switch, Typography} from "@material-ui/core";
import Image from 'next/image'
import WriteComment from "../src/container/WriteComment";
import {useRecoilState} from "recoil";
import {themeModeState} from "../src/atoms/Atom";
import Layout from "../src/container/Layout";
import firstImage from "../public/img/wedding_1.jpeg"
import Calender from "../src/container/Calender";
import ParentsModal from "../src/container/ParentsModal";
import Map from "../src/container/Map"
import CallIcon from "@material-ui/icons/Call";
import PwCheckModal from "../src/container/PwCheckModal";
import SocialNav from "../src/container/SocialNav";
import Comments from "../src/container/Comments"
import KakaoShareBtn from "../src/container/KakaoShareBtn";

interface modalPwProps {
    id: string
    password: string
    open: boolean
}

export default function Home() {

    const [themeMode, setThemeMode] = useRecoilState<boolean>(themeModeState)

    const [modal, setModal] = useState<boolean>(false)
    const [modalPw, setModalPw] = useState<modalPwProps>({id:'', password:'', open: false})

    const handleModal = (name:string) => {
        if(name === 'open'){
            setModal(true)
        } else {
            setModal(false)
        }
    };

    const handlePwModal = (name:string, id:string | undefined, password: string | undefined) => {
        if(name === 'open'){
            if(id !== undefined && password !== undefined){
                setModalPw({ id: id, password: password, open: true })
            }
        } else {
            setModalPw({ id: '', password: '', open: false })
        }
    }

    const tel = (phoneNum:string) => {
        document.location.href = `tel: ${phoneNum}`
    }

    const address ={
        title: "신도림 웨딩시티",
        lat: 37.50701658340287,
        lng: 126.89056425879167,
    }

    return (
        <Layout>
            <Container maxWidth={"sm"} style={{padding: 0}}>
                <Box position={"float"} display={"flex"} alignItems={"center"} justifyContent={"flex-end"}>
                    <Typography variant={"body2"}>다크모드</Typography>
                    <Switch
                        checked={themeMode}
                        onChange={()=>setThemeMode(!themeMode)}
                        color={"primary"}
                    />
                </Box>
                <audio autoPlay>
                    <source src="https://s3.ap-northeast-2.amazonaws.com/breezm.com/movies/mobile/music.mp3"/>
                </audio>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} style={{backgroundImage: `url("/img/ring.jpeg")`, backgroundSize: "100% 100%", width: "100%", height: "450px"}}>
                    <Typography style={{marginTop: "320px", color: "black"}} variant={"h5"}>곽경열 · 위유경</Typography>
                    <br/>
                    <Typography style={{color: "black"}} variant={"subtitle2"}>2021년 10월 31일 일요일 낮 12시 20분</Typography>
                </Box>
                <Image src={firstImage}/>
                <Box py={5}>
                    <Typography  variant={"h5"} align={"center"}>Invitation</Typography>
                </Box>
                <Typography variant={"body1"} align={"center"} component={"div"} style={{lineHeight: 2}}>
                    함께 풍<strong>경</strong>을 만들어갈 사람을 만났습니다. <br/>
                    그 누구보다도 <strong>열</strong>심히 사랑하며 <br/>
                    서로 삶의 이<strong>유</strong>가 되어 주겠습니다. <br/>
                    저희가 내딛는 풍<strong>경</strong>의 첫걸음을 <br/>
                    축하해 주시면 더없는 기쁨으로 간직하겠습니다.
                </Typography>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} my={5}>
                    <Box display={"flex"} alignItems={"center"}>
                        <Typography variant={"body1"}>
                            곽의영·김남애의 장남 경열
                        </Typography>
                        <CallIcon fontSize={"small"} style={{color: "gray"}} onClick={()=>tel("010-3609-6550")}/>
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                        <Typography variant={"body1"} >
                            위노환·이하영의 차녀 유경
                        </Typography>
                        <CallIcon fontSize={"small"} style={{color: "gray"}} onClick={()=>tel("010-4732-4618")}/>
                    </Box>
                </Box>
                <Box display={"flex"} justifyContent={"center"} my={10}>
                    <Button variant={"outlined"} onClick={()=>handleModal("open")}> 혼주에게 연락하기 </Button>
                </Box>
                <ParentsModal modal={modal} handleModal={handleModal} tel={tel}/>
                <Calender/>
                <Comments handlePwModal={handlePwModal}/>
                <PwCheckModal modalPw={modalPw} handlePwModal={handlePwModal}/>
                <WriteComment/>
                <Map latitude={address.lat} longitude={address.lng} code={"kakao_map"}/>
                <SocialNav address={address}/>
                <KakaoShareBtn/>
            </Container>
        </Layout>
    )
}
