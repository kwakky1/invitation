import React, {useEffect} from 'react';
import {Box, Typography} from "@material-ui/core";

declare global {
    interface Window {
        kakao: any;
    }
}

interface mapProps {
    latitude: number
    longitude: number
    code: string
}

const Map = (props: mapProps) => {

    const {latitude, longitude} = props
    const kakaoMap = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (kakaoMap && kakaoMap.current) {
            const coords = new (window as any).daum.maps.LatLng(latitude, longitude); // 지도의 중심좌표
            const options = {
                center: coords,
                level: 4,
            };
            const map = new (window as any).daum.maps.Map(kakaoMap.current, options);
            const marker = new (window as any).daum.maps.Marker({
                position: coords,
                map,
            });
            // 맵의 중앙으로 이동
            map.relayout();
            map.setCenter(coords);
            // 마커를 중앙으로 이동
            marker.setPosition(coords);
        }
    }, [kakaoMap]);
    return (
        <>
            <Box mb={3} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                <Typography style={{fontWeight: 700}} align={"center"} variant={"body2"}>신도림 테크노마트 웨딩시티 11층 그랜드볼룸</Typography>
                <Typography align={"center"} variant={"caption"}>서울시 구로구 새말로 97</Typography>
            </Box>
            <Box px={2}>
                <div ref={kakaoMap} style={{width: "100%", height: 300}}/>
            </Box>
        </>
    );
};

export default Map;