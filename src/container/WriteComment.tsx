import React from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import {Validation} from "../components/Validation";
import {useRecoilState} from "recoil";
import {commentState} from "../atoms/Atom";

const WriteComment = () => {

    const [comments, setComments] = useRecoilState(commentState)

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
                setComments([...comments, res.comment])
            })
            .catch(errors=>{
                alert(errors.toString())
            })
        },
    });

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
                            보내기
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </>
    );
};

export default WriteComment;