import React, {Component} from 'react';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import {ServiceRestService} from "../../services/ServiceRestService";
import {makeStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";


class ServiceAdd extends Component{

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            description: ''
        };
    }

    handelFormChange = ({target: {value, name}}) => {
        this.setState({[name]: value});
    }

    save = () => {
        ServiceRestService.create(this.state).then( ({data}) => {
            this.props.history.push(`/services`);
        });
    }

    render() {
        const useStyles = makeStyles(theme => ({
            button: {
                margin: theme.spacing(1),
            },
        }));

        return(<div>
            <div style={{padding: '20px'}}>
                <FormControl>
                    <TextField id="name" name="name" aria-describedby="worker name" value={this.state.name}
                               onChange={this.handelFormChange} variant="outlined"/>
                    <FormHelperText id="name">Service name.</FormHelperText>
                    <TextField id="description" name="description" aria-describedby="description"
                               value={this.state.description} onChange={this.handelFormChange} variant="outlined"/>
                    <FormHelperText id="description">Description.</FormHelperText>
                </FormControl>
            </div>
            <div>
                <Button
                    style={{margin: '20px'}}
                    variant="contained"
                    color="primary"
                    size="large"
                    className={useStyles.button}
                    startIcon={<SaveIcon/>}
                    onClick={this.save}
                >
                    Save
                </Button>
                <Button
                    style={{margin: '20px'}}
                    variant="contained"
                    color="danger"
                    size="large"
                    className={useStyles.button}
                    startIcon={<DeleteIcon/>}
                >
                    Cancle
                </Button>
            </div>
        </div>);
    }

}

export default withRouter(ServiceAdd);
