import React from 'react';
import {Box, Button, Divider, Grid, TextField, Typography} from "@material-ui/core";
import {useFormik} from "formik";
import {Validation} from "../components/Validation";
import {useRecoilState, useSetRecoilState} from "recoil";
import {commentState, countState, pageState} from "../atoms/Atom";

const WriteComment = () => {

    const setComments = useSetRecoilState(commentState)
    const [page] = useRecoilState(pageState);
    const setCount = useSetRecoilState(countState)

    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
            text: '',
            date: new Date()
        },
        validationSchema: Validation,
        onSubmit: (values,{resetForm}) => {
            resetForm({})
            createCommentRequest(values).then((res)=>{
                if(res.comment){
                    fetchCommentsRequest().then(res=>{
                        setComments(res.comments)
                        setCount(res.count)
                    }).catch(err=>{
                        console.log(err.toString());
                    })
                }
            })
            .catch(errors=>{
                alert(errors.toString())
            })
        },
    });

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

    const createCommentRequest = async (values:any) => {
        const response = await fetch("/api/comment/create",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(values)
        });
        return await response.json()
    }

    const { values , touched , errors, handleChange, handleSubmit} = formik

    return (
        <>
            <Box py={5}>
                <Divider/>
                <Box mt={2}>
                    <Typography variant={"body1"} align={"center"}>축하글 남겨주세요</Typography>
                </Box>
            </Box>
            <form onSubmit={handleSubmit} style={{padding: "1rem"}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            name={"name"}
                            size={"small"}
                            variant={"outlined"}
                            label={"이름"}
                            fullWidth
                            onChange={handleChange}
                            value={values.name}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <TextField
                            type={"password"}
                            name={"password"}
                            size={"small"}
                            variant={"outlined"}
                            label={"비밀번호"}
                            fullWidth
                            onChange={handleChange}
                            value={values.password}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name={"text"}
                            size={"small"}
                            variant={"outlined"}
                            label={"메세지"}
                            fullWidth
                            onChange={handleChange}
                            value={values.text}
                            error={touched.text && Boolean(errors.text)}
                            helperText={touched.text && errors.text}
                            multiline
                            rows={8}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type={"submit"}
                            color={"primary"}
                            variant={"contained"}
                            fullWidth
                        >
                            축하글 남기기
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </>
    );
};

export default WriteComment;