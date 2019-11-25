import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {SkillRestService} from "../../services/SkillRestService";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import {ListItemText} from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";


class Skills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            name: ''
        }
    }

    componentDidMount() {
        SkillRestService.getAll().then(({data}) => {
            this.setState({skills: data});
        });
    }

    save = () => {
        const {name} = this.state;
        SkillRestService.create({name}).then(()=> {
            SkillRestService.getAll().then(({data}) => {
                this.setState({skills: data});
            });
        });
    }

    onDelete = () => {
    }

    onEdit = () => {}

    displaySkills =() => {
        return this.state.skills.map( skill =>
            <React.Fragment>
            <ListItem alignItems="flex-start">
            <ListItemText primary={`${skill.name}`} secondary={''}>
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" color="primary">
                    <EditIcon onClick={ () => this.onEdit(skill) }/>
                </IconButton>
                <IconButton edge="end" aria-label="delete" color="secondary">
                    <DeleteIcon onClick={() => this.onDelete(skill)}/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
            <Divider />
            </React.Fragment>
        );
}

    handelFormChange = ({target: {name, value}}) => {
        this.setState({[name]: value});
    }

    render() {
        return(<div style={{width: '700px', marginLeft: 'auto', marginRight: 'auto'}}>
            <TextField id="name" name="name" aria-describedby="worker name" value={this.state.name}
                       onChange={this.handelFormChange} variant="outlined"/>
            <Button onClick={this.save} variant="contained" color="primary" component="span" style={{margin: '10px'}}>
                Add
            </Button>
            <div style={{paddingTop: '20px'}}>
            <Divider />
            </div>
            {this.displaySkills()}
        </div>);
    }

}

export default withRouter(Skills);
