import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardAction from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { CardHeader } from '@material-ui/core';
import styles from './styles';
import IconButton from '@material-ui/core/IconButton';;
class ActionItemCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            dueDate: this.props.dueDate
            }
        }

        render() {
                let classes = this.props.classes
                return (
                  <Card className = {classes.root}>
                    
                      
                    <CardHeader
                          title = {this.props.title}                             
                      />
                        <div className = {classes.test1}>
                        
                          <CardHeader 
                            subheader = {this.props.description}
                            action={
                              <IconButton aria-label="settings">
                                <MoreVertIcon />
                              </IconButton>
                            }           
                          />                                    
                        </div>
                    <CardAction>
                      <div className = {classes.test}>
                    
                    <CardHeader
                        title = {"Due: " + this.props.dueDate}
                        action={
                          <Button size="small" color="primary">
                          EDIT
                          </Button> 
                        }
                    />
                      </div>
                    </CardAction>
                  </Card>
                );
            }
      }
    
export default withStyles(styles)(ActionItemCard)