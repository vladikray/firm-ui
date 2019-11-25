import React from 'react';
import './App.scss';
import clsx from 'clsx';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Container, CssBaseline} from "@material-ui/core";
import {BrowserRouter, NavLink, Route, Switch, Redirect} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import FolderIcon from '@material-ui/icons/Folder';
import ContactsIcon from '@material-ui/icons/Contacts';
import PersonIcon from '@material-ui/icons/Person';
import About from "./components/About";
import Home from "./components/Home";
import Contacts from "./components/Contacts";
import Services from "./components/services/Services";
import ServiceAdd from "./components/services/ServiceAdd";
import Workers from "./components/workers/Workers";
import WorkerDetail from "./components/workers/WorkerDetail";
import WorkerAdd from "./components/workers/WorkerAdd";
import Skills from "./components/skills/Skills";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }
}));

function App() {
    const menuItems = [
        {name: 'Головна', icon: <HomeIcon/>, linkTo: '../home'},
        {name: 'Про нас', icon: <InfoIcon/>, linkTo: '../about'},
        {name: 'Пропозиції', icon: <FolderIcon/>, linkTo: '../services'},
        {name: 'Контакти/Зворотній зв\'язок', icon: <ContactsIcon/>, linkTo: '../contacts'},
        {name: 'Співробітники', icon: <PersonIcon/>, linkTo: '../workers'},
    ];

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div>
        <div className='root'>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && 'hide')}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Вигадана фірма
                    </Typography>
                </Toolbar>
            </AppBar>
            <BrowserRouter>
            <Drawer
                className='drawer'
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: 'drawer-paper'
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {menuItems.map((item, index) =>
                        <NavLink to={item.linkTo}
                                 className='navigation-link'
                                 key={index}
                                 exact
                        >
                        <ListItem button key={index}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name}>
                                </ListItemText>
                        </ListItem>
                        </NavLink>
                    ) }
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Switch>
                    <Route path="/home" component={Home} exact/>
                    <Route path="/about" component={About} exact/>
                    <Route path="/contacts" component={Contacts} exact/>
                    <Route path="/services" component={Services} exact/>
                    <Route path="/add/service" component={ServiceAdd} exact/>
                    <Route path="/workers" component={Workers} exact/>
                    <Route path="/add/worker" component={WorkerAdd} exact/>
                    <Route path="/edit/worker/:workerId" component={WorkerAdd} exact/>
                    <Route path="/workers/:workerId" component={WorkerDetail} exact/>
                    <Route path="/skills/" component={Skills} exact/>
                </Switch>
                <Route path="/" >
                    <Redirect from="/*" to="/home" exact/>
                </Route>
            </main>
            </BrowserRouter>
        </div>
            <div className="footer">
                <div>
                    <Divider />
                    <Container maxWidth="sm">
                        <Typography variant="body1">
                            &copy; Vladyslav Raykovsky {new Date().toLocaleDateString()}
                        </Typography>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default App;
