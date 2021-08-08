import React from 'react';
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import {useRecoilValue} from "recoil";
import {themeModeState} from "../atoms/Atom";
import {createTheme} from "@material-ui/core/styles";

const Layout = (props:{children: React.ReactNode}) => {

    const themeMode = useRecoilValue<boolean>(themeModeState)
    const light = createTheme({
        palette: {
            background: {
                default: "white"
            },
        },
        typography: {
            fontFamily: [
                'old-studio2',
            ].join(','),
        },
    });
    const dark = createTheme({
        palette: {
            type: "dark",
            primary:{
                main: '#90caf9'
            },
            secondary:{
                main: '#f48fb1'
            }
        },
        typography: {
            fontFamily: [
                'old-studio2',
            ].join(','),
        },
    })
    return (
        <>
            <ThemeProvider theme={themeMode ? dark : light}>
                <CssBaseline />
                {props.children}
            </ThemeProvider>
        </>
    );
};

export default Layout;