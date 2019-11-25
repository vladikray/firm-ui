import React, {Component} from 'react';
import {WorkerRestService} from "../../services/WorkerRestService";
import { makeStyles } from '@material-ui/core/styles/index';
import List from "@material-ui/core/List/index";
import ListItem from "@material-ui/core/ListItem/index";
import {ListItemText} from "@material-ui/core/index";
import Divider from "@material-ui/core/Divider/index";
import {Link, withRouter} from "react-router-dom";
import Fab from '@material-ui/core/Fab/index';
import AddIcon from '@material-ui/icons/Add';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
}));

class Workers extends Component {


    constructor(props){
        super(props);
        this.state = {
            workers: []
        };
    }

    componentDidMount() {
        WorkerRestService.getAll().then( ({data}) => {
            this.setState({workers: data});
        });
    }


    onEdit = (worker) => {
        this.props.history.push(`/edit/worker/${worker.id}`);
    }


    onDelete = (worker) => {
        WorkerRestService.delete(worker.id).then(({data}) => {
            WorkerRestService.getAll().then( ({data}) => {
                this.setState({workers: data});
            });
        });
    }

    mapWorkers  = () => {
        return this.state.workers.map( worker  => {
            return (
                <React.Fragment>
                <ListItem alignItems="flex-start" component={Link} to={`workers/${worker.id}`}>
                    <ListItemText primary={`${worker.name} ${worker.secondName}`}
                    secondary={worker.selfDescription}>
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" color="primary">
                            <EditIcon onClick={ () => this.onEdit(worker) }/>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" color="secondary">
                            <DeleteIcon onClick={() => this.onDelete(worker)}/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider component="li" />
                </React.Fragment>
            );

        });
    }

    navigateToAdd = () => {
        this.props.history.push('/add/worker');
    }

    addSkills = () => {
        this.props.history.push('/skills/');
    }

    render() {
        const  workers = this.mapWorkers();
        return (
            <React.Fragment>
                <List className={useStyles.root}>
                    {workers}
                </List>
                <Fab color="primary" aria-label="add" style={{margin: '20px'}} onClick={this.navigateToAdd}>
                    <AddIcon/>
                </Fab>
                <Fab variant="extended" style={{margin: '20px'}} onClick={this.addSkills}>
                    <ArrowForwardIos className={useStyles.extendedIcon}/>
                    Add Skill
                </Fab>
            </React.Fragment>)
    }
}

export default withRouter(Workers);
