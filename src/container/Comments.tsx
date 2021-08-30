import React, {useEffect, useState} from 'react';
import {Box, Divider, Typography} from '@material-ui/core'
import moment from "moment/moment";
import {useRecoilState} from "recoil";
import {commentState} from "../atoms/Atom";
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';

export interface commentProps {
    _id: string
    name: string
    password: string
    text: string
    date: Date
}

interface commentsProps {
    handlePwModal: (name: string, id: string, password: string) => void
}


const Comments = (props: commentsProps) => {
    const {handlePwModal} = props

    const [comments, setComments] = useRecoilState(commentState)
    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        fetchCommentsRequest().then((res) => {
            setComments(res.comments)
            setCount(res.count)
        }).catch((err) => {
            console.log(err.toString());
        })
    }, [page])

    async function fetchCommentsRequest() {
        const response = await fetch("/api/comment",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({page: page, size: 5 } )
        });
        return await response.json();
    }

    return (
        <Box>
            {
                comments !== undefined && comments.length !== 0 &&
                comments.slice(0).reverse().map((comment, index: number) => {
                    const {_id, name, text, date, password} = comment
                    return (
                        <Box key={index} p={2}>
                            <Box display={"flex"} justifyContent={"space-between"}>
                                <Typography variant={"body2"} style={{fontWeight: 700}}>{name}</Typography>
                                <Typography variant={"caption"}>{moment(date).format('YYYY-MM-DD')}</Typography>
                            </Box>
                            <Box py={2}>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <Box width={"90%"}>
                                        <Typography variant={"body2"}>{text}</Typography>
                                    </Box>
                                    <DeleteIcon style={{color: "gray"}} onClick={() => handlePwModal('open', _id, password)}/>
                                </Box>
                            </Box>
                            <Divider/>

                        </Box>
                    )
                })
            }
            <Box display={"flex"} justifyContent={"center"}>
                <Pagination count={count % 5 > 0 ? parseInt(String(count / 5)) + 1 : count / 5} page={page} onChange={(event, page)=>setPage(page)} size={"large"}/>
            </Box>
        </Box>
    );
};

export default Comments;