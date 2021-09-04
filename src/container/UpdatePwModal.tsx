import React from 'react';

import {useFormik} from "formik";
import {PasswordValidation} from "../components/Validation";
import {Button, Dialog, DialogTitle, Grid, TextField, Typography} from "@material-ui/core";
import {useRecoilState, useSetRecoilState} from "recoil";
import {selectedCommentState, updateModalState, updatePwModalState} from "../atoms/Atom";

const UpdatePwModal = () => {
    const [selectedComment] = useRecoilState(selectedCommentState)
    const [updatePwOpen, setUpdatePwOpen] = useRecoilState(updatePwModalState);
    const setUpdateOpen = useSetRecoilState(updateModalState);


    const {_id, name, password, text, date} = selectedComment

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
                setUpdatePwOpen(false)
                setUpdateOpen(true)
                resetForm({})
            }
        },
    });

    const {values, touched, errors, handleChange, handleSubmit} = formik

    return (
        <>
            <Dialog
                open={updatePwOpen}
                onClose={() => {
                    formik.resetForm({})
                    setUpdatePwOpen(false)
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
                            <Button fullWidth type={"submit"} color={"primary"} variant={"contained"}>수정</Button>
                        </Grid>
                    </Grid>
                </form>
            </Dialog>
        </>
    );
};

export default UpdatePwModal;