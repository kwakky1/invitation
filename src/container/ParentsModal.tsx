import React from 'react';
import {Dialog, Fade, makeStyles, Paper, Typography} from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import MessageIcon from "@material-ui/icons/Message";

interface parentsModalProps {
    modal: boolean
    handleModal: (name:string) => void
    tel: (phoneNum:string) => void
}

const useStyles = makeStyles({
    modalWrapper : {
        width: 300,
        '@media(min-width: 768px)' : {
            width: 400
        }
    }
})

const ParentsModal = (props: parentsModalProps) => {
    const { modal, handleModal, tel } = props
    const classes = useStyles();

    const sms = (phoneNum:string) => {
        document.location.href = `sms: ${phoneNum}`
    }

    return (
        <>
            <Dialog
                open={modal}
                onClose={()=>handleModal("close")}
                style={{display: "flex", justifyContent: "center", alignItems: "center"}}
            >
                <Fade in={modal} style={{flexDirection: "column", display: "flex", justifyContent: "center", padding: 20, borderRadius: 10}}>
                    <Paper className={classes.modalWrapper}>
                        <Typography align={"center"} style={{marginBottom: 10, fontSize: "1.1rem"}}> 혼주에게 연락하기</Typography>
                        <div style={{display: "flex", justifyContent: "space-around"}}>
                            <div style={{height: 170, display: "flex", flexDirection: "column", justifyItems: "center", justifyContent: "space-between"}} >
                                <Typography color={"primary"} align={"center"}>신랑측 혼주</Typography>
                                <div>
                                    <Typography>아버지 곽의영</Typography>
                                    <div style={{display: "flex", justifyContent: "space-around", marginTop: 10}}>
                                        <CallIcon onClick={()=>tel("010-3208-6550")}/>
                                        <MessageIcon onClick={()=>sms("010-3208-6550")}/>
                                    </div>
                                </div>
                                <div>
                                    <Typography>어머니 김남애</Typography>
                                    <div style={{display: "flex", justifyContent: "space-around", marginTop: 10}}>
                                        <CallIcon onClick={()=>tel("010-3325-6550")}/>
                                        <MessageIcon onClick={()=>sms("010-3325-6550")}/>
                                    </div>
                                </div>
                            </div>
                            <div style={{height: 170, display: "flex", flexDirection: "column", justifyItems: "center", justifyContent: "space-between"}}>
                                <Typography color={"secondary"} align={"center"}>신부측 혼주</Typography>
                                <div>
                                    <Typography>아버지 위노환</Typography>
                                    <div style={{display: "flex", justifyContent: "space-around", marginTop: 10}}>
                                        <CallIcon onClick={()=>tel("010-9132-4618")}/>
                                        <MessageIcon onClick={()=>sms("010-9132-4618")}/>
                                    </div>
                                </div>
                                <div>
                                    <Typography>어머니 이하영</Typography>
                                    <div style={{display: "flex", justifyContent: "space-around", marginTop: 10}}>
                                        <CallIcon onClick={()=>tel("010-2412-6228")}/>
                                        <MessageIcon onClick={()=>sms("010-2412-6228")}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </Fade>
            </Dialog>
        </>
    );
};

export default ParentsModal;