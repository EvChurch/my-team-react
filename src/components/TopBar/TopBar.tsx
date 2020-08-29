import React, { ReactElement, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    createStyles,
    makeStyles,
    Theme,
    Avatar,
    IconButton,
    MenuItem,
    Menu,
    ListItemText,
    ListItemAvatar,
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
} from '@material-ui/core';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250,
        },
        title: {
            flexGrow: 1,
        },
        spacerToolbar: {
            marginBottom: theme.spacing(3),
        },
        menuIconButton: {
            padding: 0,
        },
        drawerIconButton: {
            margin: theme.spacing(0, 1, 0, -2),
            color: '#fff',
        },
    }),
);

interface Props {
    session?: Session;
}

const TopBar = ({ session }: Props): ReactElement => {
    const classes = useStyles();
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const menuOpen = Boolean(menuAnchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <Box>
            <Toolbar className={classes.spacerToolbar} />
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton onClick={() => setDrawerOpen(true)} className={classes.drawerIconButton}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                        <List className={classes.list}>
                            <Link href="/" passHref>
                                <ListItem button component="a" onClick={handleDrawerClose}>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItem>
                            </Link>
                        </List>
                    </Drawer>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        My Team
                    </Typography>
                    {session?.user && (
                        <>
                            <IconButton onClick={handleMenu} className={classes.menuIconButton}>
                                <Avatar src={session.user.image}>{session.user.name[0]}</Avatar>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={menuAnchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={menuOpen}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleMenuClose}>
                                    <ListItemAvatar>
                                        <Avatar src={session.user.image}>{session.user.name[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={session.user.name} secondary={session.user.email} />
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={signOut}>Sign Out</MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default TopBar;
