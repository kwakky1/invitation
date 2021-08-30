import React, {useEffect} from 'react';
import Image from "next/image";
import {Box, Button} from "@material-ui/core";
import kakaoShare from "../../public/img/kakao_share.png";

const KakaoShareBtn = () => {

    useEffect(() => {
        if (!(window as any).Kakao.isInitialized()) {
            (window as any).Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
        }
        (window as any).Kakao.Link.createDefaultButton({
            container: '#kakao-link-btn',
            objectType: 'location',
            address: '서울특별시 구로구 새말로 97 신도림테크노마트 11층',
            addressTitle: '신도림 웨딩시티 그랜드볼룸 11층',
            content: {
                title: '경열❤️유경 결혼식에 초대합니다.',
                description: '2021년 10월 31일(일) 낮 12시 20분',
                imageUrl: 'https://invitation-beta.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fimg%2Fwedding_1.caee51bdfac7f41c1368e740d4d176c8.jpeg&w=3840&q=75',
                link: {
                    mobileWebUrl: 'https://invitation-beta.vercel.app/',
                    webUrl: 'https://invitation-beta.vercel.app/'
                }
            },
            buttons: [
                {
                    title: '자세히 보기',
                    link: {
                        mobileWebUrl: 'https://invitation-beta.vercel.app/',
                        webUrl: 'https://invitation-beta.vercel.app/'
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