import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import {withRouter} from "react-router-dom";
import Card from '@material-ui/core/Card/index';
import CardActionArea from '@material-ui/core/CardActionArea/index';
import CardContent from '@material-ui/core/CardContent/index';
import Typography from '@material-ui/core/Typography/index';
import {WorkerRestService} from "../../services/WorkerRestService";
import CardActions from "@material-ui/core/CardActions/index";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
});

class WorkerDetail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            worker: null
        }
    }

    componentDidMount() {
        WorkerRestService.getById(this.props.match.params.workerId).then(({data}) => {
            this.setState({worker: data});
        });
    }


    displayServices = () => {
        return this.state.worker.services.map(service => {
            return <Chip size="medium" color="primary" label={service.name} style={{margin: '5px'}}/>
        });
    }

    displaySkills = () => {
        return this.state.worker.skills.map(service => {
            return <Chip size="medium" color="primary" label={service.name} style={{margin: '5px'}}/>
        });
    }

    render() {
        return this.state.worker ?
        (<div style={{width: '700px', marginLeft: 'auto', marginRight: 'auto'}}>
            <Card className={useStyles.card}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.state.worker.name} {this.state.worker.secondName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.state.worker.selfDescription}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <div style={{paddingTop: '10px'}}>
                        {this.displayServices()}
                    </div>
                </CardActions>
                <CardActions>
                    <div style={{paddingTop: '10px'}}>
                        {this.displaySkills()}
                    </div>
                </CardActions>
            </Card>
        </div>)
        :(<div></div>)
    }
}

export default withRouter(WorkerDetail);
