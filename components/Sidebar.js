import React from 'react';
import styled from 'styled-components';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function Sidebar() {
    return ( <
        container >
        <
        Header >
        <
        UserAvatar / >

        <
        IconsConatiner >
        <
        IconButton >
        <
        ChatIcon / >
        <
        MoreVertIcon / >
        <
        /IconButton  >

        <
        /IconsConatiner> < /
        Header > < /
        container >
    )
}

const container = styled.div ``;

const Header = styled.div `
display:flex;
position:sticky;
top:0;
background-color:white;
z-index:1;
justify-content:space-between;
align-items:center;
padding:15px;
height:80px;
border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)
`
cursor:pointer;

:hover {
    opaciity : 0.8;
 }

`;

const IconsConatiner = styled.div ``;