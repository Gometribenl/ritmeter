import * as React from 'react';
import {AppBar, Stack, Toolbar, Icon} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


export default function Menu(props) {
    return (
        <Stack sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Icon edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <LocalShippingIcon />
                    </Icon>
                    <Stack direction="row" spacing={2}>
                    {props.children}
                    </Stack>
                </Toolbar>
            </AppBar>
        </Stack>
    );
}