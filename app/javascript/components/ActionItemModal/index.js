import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ActionItemCard from 'components/ActionItemCard';
import ActionItemForm from 'components/ActionItemForm';
import styles from './styles';
class ActionItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: [],
      //  cardList: {
      //    title:
      //    description:
      //    dueDate:
      //  }
    };
    this.addCard = this.addCard.bind(this);
  }

  addCard(title, description, dueDate, category) {
    const newCard = {
      title,
      description,
      dueDate,
      category,
    };
    this.setState(prevState => ({
      cardList: [...prevState.cardList, newCard],
    }));
  }

  render() {
    const cards = this.state.cardList.map(card => (
      <ActionItemCard
        title={card.title}
        description={card.description}
        dueDate={card.dueDate}
        category={card.category}
      />
    ));

    return (
      <div>
        {cards}
        <ActionItemForm addCard={this.addCard} />
      </div>
    );
  }
}

ActionItemCard.propTypes = {};

ActionItemCard.defaultProps = {};

export default withStyles(styles)(ActionItemModal);
