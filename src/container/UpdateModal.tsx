import React, {useEffect, useState} from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import {commentState, pageState, selectedCommentState, updateModalState} from "../atoms/Atom";
import {useFormik} from "formik";
import {UpdateValidation} from "../components/Validation";
import {Button, Dialog, DialogTitle, Grid, TextField, Typography} from "@material-ui/core";

const UpdateModal = () => {
    const [selectedComment] = useRecoilState(selectedCommentState)
    const [updateOpen, setUpdateOpen] = useRecoilState(updateModalState);
    const setComments = useSetRecoilState(commentState)
    const [page] = useRecoilState(pageState);

    const formik = useFormik({
        initialValues: selectedComment,
        validationSchema: UpdateValidation,
        enableReinitialize: true,
        onSubmit: (values, {resetForm}) => {
            const {_id, name, password, text, date} = values
            updateCommentRequest(_id, name, password, text, date)
                .then(res=>{
                    if(res.success === true){
                        fetchCommentsRequest().then(res=>{
                            setComments(res.comments)
                        }).catch(err=>{
                            console.log(err.toString());
                        })
                    } else {
                        alert("다시 한번 시도해 주세요.")
                    }
                })
                .catch( err => {
                    console.log(err);
                })
            resetForm({})
            setUpdateOpen(false)
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

    const updateCommentRequest = async (id:string, name:string, password: string, text: string, date: Date) => {
        const response = await fetch("/api/comment/update",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({id, name, password, text, date})
        });
        return await response.json()
    }

    const {values, touched, errors, handleChange, handleSubmit} = formik

    return (
        <>
            <Dialog
                open={updateOpen}
                onClose={()=>{
                    formik.resetForm({})
                    setUpdateOpen(false)
                }}
            >
                <DialogTitle>
                    <Typography variant="body1" align="center">메세지를 수정해주세요</Typography>
                </DialogTitle>
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
                                수정하기
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Dialog>
        </>
    );
};

export default UpdateModal;