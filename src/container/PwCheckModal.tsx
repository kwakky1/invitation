import React, {useEffect} from 'react';
import {Button, Dialog, DialogTitle, Grid, TextField, Typography} from "@material-ui/core";
import {useFormik} from "formik";
import {PasswordValidation} from "../components/Validation";
import {useRecoilState, useSetRecoilState} from "recoil";
import {commentState, countState, pageState} from "../atoms/Atom";

interface checkProps {
    modalPw: { id: string, password: string, open: boolean }
    handlePwModal: (name: string, id: string | undefined, password: string | undefined) => void
}

const PwCheckModal = (props: checkProps) => {

    const {modalPw: {id, password, open}, handlePwModal} = props
    const setComments = useSetRecoilState(commentState);
    const [page] = useRecoilState(pageState);
    const setCount = useSetRecoilState(countState);

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: PasswordValidation,
        onSubmit: (values, {resetForm}) => {
            if (values.password !== password) {
                alert("비밀번호가 틀렸습니다.")
                resetForm({})
            } else {
                deleteCommentRequest(id)
                    .then( res =>{
                        if(res.success === true){
                            fetchCommentsRequest().then(res=>{
                                setComments(res.comments)
                                setCount(res.count)
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
                handlePwModal('close', undefined, undefined)
            }
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

    const deleteCommentRequest = async (id:any) => {
        const response = await fetch("/api/comment/delete",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({id})
        });
        return await response.json()
    }

    const {values, touched, errors, handleChange, handleSubmit} = formik

    return (
        <>
            <Dialog
                open={open}
                onClose={() => {
                    formik.resetForm({})
                    handlePwModal('close', undefined, undefined)
                }}
            >
                <DialogTitle>
                    <Typography variant="body1" align="center">비밀번호를 입력해주세요</Typography>
                </DialogTitle>
                <form onSubmit={handleSubmit} style={{padding: "1rem"}}>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <TextField
                                name="password"
                                label="비밀번호"
                                size={"small"}
                                variant={"outlined"}
                                type="password"
                                onChange={handleChange}
                                value={values.password}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button fullWidth type={"submit"} color={"primary"} variant={"contained"}>삭제</Button>
                        </Grid>
                    </Grid>
                </form>
            </Dialog>
        </>
    );
};

export default PwCheckModal;