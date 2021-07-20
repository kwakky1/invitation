import React, {useEffect} from 'react';
import Image from "next/image";
import {Box, Button} from "@material-ui/core";
import kakaoMap from "../../public/img/location_kakaomap.png";
import kakaoShare from "../../public/img/kakao_share.png";

const KakaoShareBtn = () => {

    useEffect(() => {
        if (!(window as any).Kakao.isInitialized()) {
            (window as any).Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
        }
        (window as any).Kakao.Link.createDefaultButton({
            container: '#kakao-link-btn',
            objectType: 'feed',
            content: {
                title: '경열❤️유경 결혼식에 초대합니다.',
                description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
                imageUrl: 'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
                link: {
                    mobileWebUrl: 'https://cheonmro.github.io/',
                    webUrl: 'https://cheonmro.github.io/'
                }
            },
            buttons: [
                {
                    title: '웹으로 보기',
                    link: {
                        mobileWebUrl: 'https://cheonmro.github.io/',
                        webUrl: 'https://cheonmro.github.io/'
                    }
                },
                {
                    title: '앱으로 보기',
                    link: {
                        mobileWebUrl: 'https://cheonmro.github.io/',
                        webUrl: 'https://cheonmro.github.io/'
                    }
                }
            ]
        });

    }, [])

    const shareHandle = () => {
        window.location.href = 'https://sharer.kakao.com/talk/friends/picker/link'
    }
    return (
        <>
            <Box p={2}>
                <Button id={'kakao-link-btn'} fullWidth variant={"contained"} style={{backgroundColor: "yellow" }} onClick={shareHandle}>
                    <Image width={50} height={40} src={kakaoShare} />
                    카카오로 공유하기
                </Button>
            </Box>
        </>
    );
};

export default KakaoShareBtn;