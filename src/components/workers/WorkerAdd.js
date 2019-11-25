
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import {WorkerRestService} from "../../services/WorkerRestService";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {ServiceRestService} from "../../services/ServiceRestService";
import {SkillRestService} from "../../services/SkillRestService";

class WorkerAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            secondName: '',
            selfDescription: '',
            allServices: [],
            selectedServices: [],
            services: [],
            allSkills: [],
            selectedSkills: [],
            skills: []
        };
    }

    componentDidMount() {
        ServiceRestService.getAll().then(({data}) => {
            this.setState({allServices: data});
        });
        SkillRestService.getAll().then( ({data}) => {
            this.setState({allSkills: data});
        });
        const {workerId} = this.props.match.params;
        if(workerId) {
            WorkerRestService.getById(workerId).then(({data}) => {
                const {services, skills}  = data;
                this.setState({...data,
                    selectedServices: services.map(it => it.name),
                    selectedSkills: skills.map(it => it.name)});
            });
        }
    }

    handelFormChange = ({target: {value, name}}) => {
        this.setState({[name]: value});
    }


    handelServiceChange = ({target: {value, name}}) => {
        const selectedServices = this.state.allServices.filter(service => value.includes(service.name));
        this.setState({selectedServices: [...value], services: selectedServices});

    }

    handelSkillChange = ({target: {value, name}}) => {
        const selectedSkills = this.state.allSkills.filter(skill => value.includes(skill.name));
        this.setState({selectedSkills: [...value], skills: selectedSkills});
    }

    save = () => {
        if(this.state.id) {
            WorkerRestService.update(this.state.id, this.state).then( ({data}) => {
                this.props.history.push(`/workers/${data.id}`);
            });
        } else {
            WorkerRestService.create(this.state).then( ({data}) => {
                this.props.history.push(`/workers/${data.id}`);
            });
        }
    }

    cancel = () => {
        this.props.history.push('/workers/');
    }

    render() {
        const useStyles = makeStyles(theme => ({
            button: {
                margin: theme.spacing(1),
            },
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
                maxWidth: 300,
            },
            chips: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            chip: {
                margin: 2,
            },
            noLabel: {
                marginTop: theme.spacing(3),
            }
        }));

        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 450,
                },
            },
        };

        return(
            <div style={{width: '800px', marginRight: 'auto', marginLeft: 'auto'}}>
                <div style={{padding: '20px'}}>
                    <div>
                        <FormControl style={{width: '600px'}}>
                            <TextField id="name" name="name" aria-describedby="worker name" value={this.state.name}
                                       onChange={this.handelFormChange} variant="outlined"/>
                            <FormHelperText id="name">worker name.</FormHelperText>
                            <TextField id="secondName" name="secondName" aria-describedby="worker name"
                                       value={this.state.secondName} onChange={this.handelFormChange}
                                       variant="outlined"/>
                            <FormHelperText id="secondName">worker second name.</FormHelperText>
                            <TextField id="selfDescription" name="selfDescription" aria-describedby="worker name"
                                       value={this.state.selfDescription} onChange={this.handelFormChange}
                                       variant="outlined"/>
                            <FormHelperText id="selfDescription">Description.</FormHelperText>
                        </FormControl>
                    </div>
                    <div style={{paddingTop: '20px'}}>
                        <FormControl className={useStyles.formControl}>
                            <InputLabel id="demo-mutiple-chip-label" style={{width: '600px'}}>Services</InputLabel>
                            <Select style={{width: '600px'}}
                                    name="services"
                                    labelId="demo-mutiple-chip-label"
                                    id="demo-mutiple-chip"
                                    multiple
                                    value={this.state.selectedServices}
                                    onChange={this.handelServiceChange}
                                    input={<Input id="select-multiple-chip"/>}
                                    renderValue={selected => (
                                        <div className={useStyles.chips}>
                                            {selected.map(value => (
                                                <Chip key={value} label={value} className={useStyles.chip}/>
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                            >
                                {this.state.allServices.map(service => (
                                    <MenuItem key={service.name} value={service.name}>
                                        {service.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{paddingTop: '20px'}}>
                        <FormControl className={useStyles.formControl}>
                            <InputLabel id="demo-mutiple-chip-label" style={{width: '600px'}}>Skills</InputLabel>
                            <Select style={{width: '600px'}}
                                    name="skills"
                                    labelId="demo-mutiple-chip-label"
                                    id="demo-mutiple-chip"
                                    multiple
                                    value={this.state.selectedSkills}
                                    onChange={this.handelSkillChange}
                                    input={<Input id="select-multiple-chip"/>}
                                    renderValue={selected => (
                                        <div className={useStyles.chips}>
                                            {selected.map(value => (
                                                <Chip key={value} label={value} className={useStyles.chip}/>
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                            >
                                {this.state.allSkills.map(skill => (
                                    <MenuItem key={skill.name} value={skill.name}>
                                        {skill.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div>

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
                        onClick={this.cancel}
                    >
                        Cancle
                    </Button>
                </div>
            </div>
        );
    }


}
export default withRouter(WorkerAdd);
