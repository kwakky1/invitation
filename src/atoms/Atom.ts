import {atom} from "recoil";
import {commentProps} from "../container/Comments";

export const themeModeState = atom({
    key: 'themeModeState',
    default: false,
})

export const commentState = atom<commentProps[]>({
    key: 'commentState',
    default: [],
})