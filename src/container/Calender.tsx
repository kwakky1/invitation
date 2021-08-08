import React, {useState} from 'react';
import moment, {Moment} from "moment";
import clsx from "clsx";
import {Box, makeStyles, Typography, Divider} from "@material-ui/core";
import {useRecoilValue} from "recoil";
import {themeModeState} from "../atoms/Atom";

const useStyles = makeStyles(theme=>({
    nav: {
        display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "2rem"
    },
    head: {
        display: "flex", justifyContent: "center", alignItems: "center", fontSize: 12,
        width: 35, height: 35, textAlign: "center"
    },
    body: {
        display: "flex", justifyContent: "center", alignItems: "center", fontSize: 12,
        width: 35, height: 35, textAlign: "center"
    },
    bodyFont: {
        fontSize: 9, fontWeight: 300, borderRadius: "100%"
    },
    checkedDay: {
        backgroundColor: "grey", color: "#ffffff!important", borderRadius: "100%", fontWeight: 700,
    },
    saturday: {
        color: ({check}:any)=> check ? "#90caf9" : "#003C7E"
    },
    sunday: {
        color: ({check}:any)=> check ? "#f48fb1" : "#c6472b"
    },
    none: {
        visibility: "hidden"
    }
}))


const Calender = () => {

    const [today] = useState<Moment>(moment('2021-10-31'));
    const themeMode = useRecoilValue<boolean>(themeModeState)
    const classes = useStyles({check: themeMode})

    const getDate = () => {

        const startWeek = today.clone().startOf('month').week() >= 52 ? 0 : today.clone().startOf('month').week();
        const endWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

        let calendar = []

        // 캘린더 배열 만들기
        for (let week = startWeek; week <= endWeek; week++) {
            calendar.push(
                Array(7).fill(0).map((n, i) => {
                    return today.clone().week(week).startOf('week').add(n + i, 'day')
                })
            )
        }

        // 캘린더 날짜 부분 렌더링
        return calendar.map((week: (Moment)[], index: number) =>
            <Box key={index} display={"flex"} justifyContent={"space-between"}>
                {
                    week.map((day: Moment, index: number) => {
                        return (
                            <Box key={index}>
                                <Typography
                                    className={clsx(classes.body,
                                        {[classes.saturday]: index === 6},
                                        {[classes.sunday]: index === 0},
                                        {[classes.checkedDay]: day.format('YYYYMMDD') === today.format('YYYYMMDD')},
                                        {[classes.none]: day.format('MM') !== today.format("MM")}
                                    )}
                                >
                                    {!day ? "" : day.format('D')}
                                </Typography>
                            </Box>
                        )
                    })
                }
            </Box>
        )
    }

    // 헤더 값
    const week = ["S", "M", "T", "W", "T", "F", "S"]

    const getWeek = () => {
        return week.map((day: string, index: number) => {
            return (
                <Box key={index}>
                    <Typography
                        className={clsx(classes.head, {[classes.saturday]: index === 6}, {[classes.sunday]: index === 0})}
                    >
                        {day}
                    </Typography>
                </Box>
            )

        })
    }

    return (
        <Box py={2}>
            <Box px={4}>
                <Box className={classes.nav} display={"flex"} flexDirection={"column"}>
                    <Typography variant={"body1"} style={{fontWeight: 700}}>10월 31일</Typography>
                    <Box py={1}>
                        <Typography variant={"caption"}>일요일 낮 12시 20분</Typography>
                    </Box>
                    <Box pt={1} width={"100%"}>
                        <Divider style={{ width: "100%"}}/>
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <Box>
                            <Box display={"flex"} justifyContent={"space-between"}>
                                {getWeek()}
                            </Box>
                        </Box>
                        <Box>
                            {getDate()}
                        </Box>
                    </Box>

                </Box>
                <Box pt={5} pb={2}>
                    <Divider style={{ width: "100%"}}/>
                </Box>
            </Box>
        </Box>
    );
};

export default Calender;