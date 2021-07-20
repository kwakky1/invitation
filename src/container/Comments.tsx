import React, {useEffect} from 'react';
import {Box, Divider, Typography} from '@material-ui/core'
import moment from "moment/moment";
import {useRecoilState} from "recoil";
import {commentState} from "../atoms/Atom";
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
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


    useEffect(() => {
        fetchCommentsRequest().then((res) => {
                setComments(res.comments)
            }
        ).catch((err) => {
            alert(err.toString());
        })
    }, [])

    async function fetchCommentsRequest() {
        const response = await fetch("/api/comment");
        return await response.json();
    }

    const handleHeart = (id:string) => {

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
                                <Typography variant={"body2"} style={{fontWeight: 700}}>{name}</Typography>
                                <Typography variant={"caption"}>{moment(date).format('YYYY-MM-DD')}</Typography>
                            </Box>
                            <Box py={2}>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <Box width={"90%"}>
                                        <Typography variant={"body2"}>{text}</Typography>
                                    </Box>
                                    <FavoriteBorderIcon color={"secondary"} onClick={()=>handleHeart(_id)}/>
                                    <DeleteIcon style={{color: "gray"}} onClick={() => handlePwModal('open', _id, password)}/>
                                </Box>
                            </Box>
                            <Divider/>

                        </Box>
                    )
                })
            }
            <Box display={"flex"} justifyContent={"center"}>
                <Pagination count={comments ? comments.length / 5 : 0}/>
            </Box>
        </Box>
    );
};

export default Comments;