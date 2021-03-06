import React, {useEffect, useState} from 'react';
import {Box, Chip, Divider, Typography} from '@material-ui/core'
import moment from "moment/moment";
import {useRecoilState, useSetRecoilState} from "recoil";
import {commentState, countState, pageState, selectedCommentState, updatePwModalState} from "../atoms/Atom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from '@material-ui/lab/Pagination';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import UpdatePwModal from "./UpdatePwModal";

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
    const setUpdatePwOpen = useSetRecoilState(updatePwModalState);
    const setSelectedComment = useSetRecoilState(selectedCommentState);
    const [page, setPage] = useRecoilState(pageState);
    const [count, setCount] = useRecoilState(countState);

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

    const handleUpdateModal = (comment:commentProps) => {
        setSelectedComment(comment)
        setUpdatePwOpen(true)
    }

    return (
        <Box>
            {
                comments !== undefined && comments.length !== 0 &&
                comments.map((comment, index: number) => {
                    const {_id, name, text, date, password} = comment
                    return (
                        <Box key={index} p={2}>
                            <Box display={"flex"} justifyContent={"space-between"}>
                                <Chip
                                    icon={<TagFacesIcon />}
                                    label={name}
                                    color="primary"
                                    variant={"outlined"}
                                />
                                <Typography variant={"caption"}>{moment(date).format('YYYY-MM-DD')}</Typography>
                            </Box>
                            <Box py={2}>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <Box width={"90%"}>
                                        <Typography variant={"body2"}>{text}</Typography>
                                    </Box>
                                    <EditIcon style={{color: "gray"}} onClick={()=>handleUpdateModal(comment)}/>
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