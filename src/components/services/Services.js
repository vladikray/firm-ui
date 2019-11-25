import React, {Component} from 'react';
import {ServiceRestService} from "../../services/ServiceRestService";
import ListItem from "@material-ui/core/ListItem";
import {withRouter} from "react-router-dom";
import {ListItemText, makeStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Fab from '@material-ui/core/Fab/index';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    }
}));


class Services extends Component {

    constructor(props) {
        super(props);

        this.state = {
            services: []
        }
    }


    mapServices = () => {
        return this.state.services.map( service => {
            return (
                <React.Fragment>
                    <ListItem alignItems="flex-start" >
                        <ListItemText primary={service.name}
                                      secondary={service.description}>
                        </ListItemText>
                    </ListItem>
                    <Divider component="li" />
                </React.Fragment>
            );
        });
    }

    componentDidMount() {
        ServiceRestService.getAll().then(({data}) => {
            this.setState({services: data});
        });
    }


    navigateToAdd = () => {
        this.props.history.push('/add/service')
    }

    render() {
        const services = this.mapServices();
        return(<div>
            <div>Services</div>
            <List className={useStyles.root}>
                {services}
            </List>
            <Fab color="primary" aria-label="add" onClick={this.navigateToAdd}>
                <AddIcon/>
            </Fab>
        </div>)
    }
}

export default withRouter(Services);
