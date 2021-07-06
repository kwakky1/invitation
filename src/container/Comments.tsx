import React, {useEffect, useState} from 'react';
import {Box, Button, Typography} from '@material-ui/core'
import moment from "moment/moment";
import {useRecoilState} from "recoil";
import {commentState} from "../atoms/Atom";


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


const Comments = (props:commentsProps) => {
    const { handlePwModal } = props

    const [comments, setComments] = useRecoilState(commentState)

    const deleteHandle = (id: string) => {
        if(comments.length !== 0){
            const changedComments = comments.filter((comment) => comment._id !== id)
            setComments(changedComments)
        }
    }
    useEffect(()=>{
        fetchCommentsRequest().then((res)=>{
            setComments(res.comments)
        }
        ).catch((err)=>{
            alert(err.toString());
        })
    },[])

    async function fetchCommentsRequest(){
        const response = await fetch("/api/comment");
        return await response.json();
    }

    return (
        <Box>
            {
                comments.length !== 0 &&
                comments.map((comment, index:number)=>{
                    const {_id, name, text, date, password } = comment
                    return (
                        <Box key={index}>
                            <Box display={"flex"} justifyContent={"space-between"}>
                                <Typography>{name}</Typography>
                                <Typography>{moment(date).format('YYYY-MM-DD')}</Typography>
                                <Button onClick={()=>handlePwModal('open', _id, password)}>삭제</Button>
                            </Box>
                            <Box>
                                {text}
                            </Box>
                        </Box>
                    )
                })
            }
        </Box>
    );
};

export default Comments;