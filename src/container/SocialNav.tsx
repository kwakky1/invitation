import React from 'react';
import Image from "next/image";
import tMap from "../../public/img/location_tmap.png";
import naverMap from "../../public/img/location_navermap.png";
import kakaoMap from "../../public/img/location_kakaomap.png";
import {Box, Typography} from "@material-ui/core";

interface SocialNavProps {
    address: { title:string , lat: number, lng: number}
}

const SocialNav = (props:SocialNavProps) => {

    const { address } = props

    const handleGuide = (e:React.MouseEvent<HTMLImageElement>, name: string) => {
        switch (name) {
            case "tMap" : window.location.href = `https://apis.openapi.sk.com/tmap/app/routes?appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}&name=${address.title}&lon=${address.lng}&lat=${address.lat}`
                break
            case "kakaoMap": window.location.href = `https://map.kakao.com/link/to/${address.title},${address.lat},${address.lng}`
                break
            case "naverMap" : window.location.href = `http://app.map.naver.com/launchApp/?version=11&menu=navigation&elat=${address.lat}&elng=${address.lng}&etitle=${address.title}`
                break
            default : break
        }
    }

    return (
        <>
            <Box display={"flex"} justifyContent={"space-between"} px={5} py={5}>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                    <Box>
                        <Image width={50} height={50} src={tMap} alt="tMap" onClick={(e)=>handleGuide(e, "tMap")}/>
                    </Box>
                    <Typography variant={"caption"} align={"center"}>티맵</Typography>
                </Box>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                    <Box>
                        <Image width={50} height={50} src={naverMap} alt="naverMap" onClick={(e)=>handleGuide(e, "naverMap")}/>
                    </Box>
                    <Typography variant={"caption"} align={"center"}>네이버지도</Typography>
                </Box>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                    <Box>
                        <Image width={50} height={50} src={kakaoMap} alt="kakaoMap" onClick={(e)=>handleGuide(e, "kakaoMap")}/>
                    </Box>
                    <Typography variant={"caption"} align={"center"}>카카오맵</Typography>
                </Box>
            </Box>
        </>
    );
};

export default SocialNav;