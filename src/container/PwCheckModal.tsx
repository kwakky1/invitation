import React from 'react';
import {Button, Dialog, DialogTitle, Grid, TextField, Typography} from "@material-ui/core";
import {useFormik} from "formik";
import {PasswordValidation} from "../components/Validation";

interface checkProps {
    modalPw: {id: string, password: string, open: boolean}
    handlePwModal: (name:string, id:string|undefined, password: string|undefined) => void
}



const PwCheckModal = (props:checkProps) => {

    const { modalPw:{ id, password, open }, handlePwModal } = props

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: PasswordValidation,
        onSubmit: (values,{resetForm}) => {
            if(values.password !== password){
                alert("비밀번호가 틀렸습니다.")
                resetForm({})
            } else {
                alert("비밀 번호 맞음")
                resetForm({})
                handlePwModal('close', undefined, undefined)
            }
        },
    });

    const { values , touched , errors, handleChange, handleSubmit } = formik

    return (
        <>
            <Dialog
                open={open}
                onClose={()=> {
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
                            <Button fullWidth type={"submit"} color={"primary"} variant={"contained"} >삭제</Button>
                        </Grid>
                    </Grid>
                </form>
            </Dialog>
        </>
    );
};

export default PwCheckModal;