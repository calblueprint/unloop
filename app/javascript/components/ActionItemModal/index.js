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
import ActionItemCard from '../ActionItemCard/index.js';
import IconButton from '@material-ui/core/IconButton';import ActionItemForm from '../ActionItemForm';
;

class ActionItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           cardList: []
          //  cardList: {
          //    title:
          //    description:
          //    dueDate:
          //  }
            }
            this.addCard = this.addCard.bind(this)
          
            
        }
  

        addCard(title, description, dueDate) {
          let newCard = {
            title: title,
            description: description,
            dueDate: dueDate,

          }
          this.setState(prevState => ({
            cardList: [...prevState.cardList, newCard]
          }))
        }


        render() {
          let cards = this.state.cardList.map((card) => {
            console.log("print")
            return <ActionItemCard
              title = {card.title}
              description = {card.description}
              dueDate = {card.dueDate}
              />

          })
          console.log(this.state.cardList)

          return (
            <div>
            {cards}
            <Button onClick = {()=> this.addCard("title", "description", "4/1/20")}>
              test
            </Button>
            <ActionItemForm  addCard = {this.addCard} />
            </div>
          )

          }
        }

export default withStyles(styles)(ActionItemModal)
