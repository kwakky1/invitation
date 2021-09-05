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

export const pageState = atom<number>({
    key: 'pageState',
    default: 1,
})

export const countState = atom<number>({
    key: 'countState',
    default: 0,
})

export const updatePwModalState = atom<boolean>({
    key: 'updatePwModalState',
    default: false,
})

export const updateModalState = atom<boolean>({
    key: 'updateModalState',
    default: false,
})

export const selectedCommentState = atom<commentProps>({
    key: 'selectedCommentState',
    default: {_id: '', name: '', password: '', text: '', date: new Date()},
})


