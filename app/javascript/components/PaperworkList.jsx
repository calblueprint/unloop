import React from "react";
import { grey } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import { List, ListItem } from '@material-ui/core';


const styles = {
  card: {
    width: 345,
  },
  greyAvatar: {
    margin: 5,
    color: '#fff',
    backgroundColor: grey[900],
    height: 20,
    width: 20,
  },
}

function PaperworkEntry(props) {
  return (
    <ListItem
        button
        component="a"
        href={props.link}
        target="_blank"
    >
        <Card style={styles.card} maxWidth="sm" fullWidth>
          <CardHeader
            action={
                  <IconButton aria-label="settings">
                    <MoreHorizIcon fontSize="large"/>
                  </IconButton>
                  }
            avatar={ <Avatar variant="circle" style={styles.greyAvatar} /> }
            title={props.title}
            titleTypographyProps = {{variant : "h6"}}
            subheader="Assigned: 09/14/2016"
          />
        </Card>
    </ListItem>
  )
}

class PaperworkList extends React.Component {
  constructor(props) {
    super(props);
    const relevant_paperworks = this.props.paperworks.map(paperwork => {
      return {link: paperwork.link, title: paperwork.title}
    });
    console.log("THIS IS RELEVANT PAPERWORKS: ");
    console.log(relevant_paperworks);
    this.state = {
      list_of_paperworks : relevant_paperworks,
    };
  }

  render() {
    return (
   <List styles ={styles.list}>
    {
      this.state.list_of_paperworks.map(paperwork => {
        return (<PaperworkEntry link={paperwork.link} title={paperwork.title}/>);
      })
    }
    </List> )
  }
}

export default PaperworkList;
