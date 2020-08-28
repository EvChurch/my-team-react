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
    Container,
    Divider,
    Drawer,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
} from '@material-ui/core';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import MenuIcon from '@material-ui/icons/Menu';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TuneIcon from '@material-ui/icons/Tune';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250,
        },
        title: {
            flexGrow: 1,
        },
        toolbar: {
            padding: 0,
        },
        spacerToolbar: {
            marginBottom: theme.spacing(3),
        },
        menuIconButton: {
            padding: 0,
        },
        drawerIconButton: {
            margin: theme.spacing(0, 0, 0, -2),
            color: '#fff',
        },
    }),
);

interface Props {
    session: Session;
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
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <IconButton onClick={() => setDrawerOpen(true)} className={classes.drawerIconButton}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                            <List className={classes.list}>
                                <Link href="/checkins" passHref>
                                    <ListItem button component="a" onClick={handleDrawerClose}>
                                        <ListItemIcon>
                                            <ExitToAppIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Checkins" />
                                    </ListItem>
                                </Link>
                                <Link href="/forms" passHref>
                                    <ListItem button component="a" onClick={handleDrawerClose}>
                                        <ListItemIcon>
                                            <ListAltIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Forms" />
                                    </ListItem>
                                </Link>
                                <Link href="/processes" passHref>
                                    <ListItem button component="a" onClick={handleDrawerClose}>
                                        <ListItemIcon>
                                            <SyncAltIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Processes" />
                                    </ListItem>
                                </Link>
                                <Link href="/queries" passHref>
                                    <ListItem button component="a" onClick={handleDrawerClose}>
                                        <ListItemIcon>
                                            <TuneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Queries" />
                                    </ListItem>
                                </Link>
                                <Link href="/results" passHref>
                                    <ListItem button component="a" onClick={handleDrawerClose}>
                                        <ListItemIcon>
                                            <TrendingUpIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Results" />
                                    </ListItem>
                                </Link>
                            </List>
                        </Drawer>
                        <Typography variant="h6" color="inherit" className={classes.title}>
                            <strong>Tandem Ministries</strong> &nbsp;<Hidden only="xs">Analytics</Hidden>
                        </Typography>
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
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default TopBar;
