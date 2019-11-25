import React from "react";
import { grey } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import PaperworkForm from './PaperworkForm1.jsx';
import CardHeader from '@material-ui/core/CardHeader';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import { CardActionArea, Grid, Typography, Container, List, ListItem } from '@material-ui/core';


const styles = {
  darkGreyAvatar: {
    color: '#fff',
    backgroundColor: grey[900],
    height: 10,
    width: 10,
  },
  lightGreyAvatar: {
    color: '#fff000',
    backgroundColor: grey[500],
    height: 10,
    width: 10,
  },
  componentTitle: {
    borderBottom: '5px solid #C4C4C4',
  },
  listStyle: {
    marginTop: '10px',
    maxHeight: '75%',
    overflow: 'auto',
  },
  listItemStyle: {
    paddingLeft: '0px',
  },
  cardStyle: {
    width: '100%',
    borderBottom: '.5px solid grey'

  },
  containerStyle: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    height: '500px',
  }
}

function formatDate(date_string) {
  const date_object = new Date(date_string);
  const year  = date_object.getFullYear();
  const month = date_object.getMonth() + 1;
  const dt = date_object.getDate();
  return month.toString() + '/' + dt.toString() + '/' + year.toString();
}


function PaperworkEntry(props) {
  const dateString = formatDate(props.date);
  return (
        <Card
            component="a"
            href={props.link}
            target="_blank"
            fullWidth
        >
        <CardActionArea style={styles.cardStyle}>
          <CardHeader
            action={
                  <IconButton aria-label="settings">
                    <MoreHorizIcon fontSize="large"/>
                  </IconButton>
                  }
            avatar={ <Avatar variant="circle"
                        style={ props.agree ? styles.darkGreyAvatar : styles.lightGreyAvatar }
                      /> }
            title={props.title}
            titleTypographyProps = {{variant : "h6"}}
            subheader={dateString}
          />
        </CardActionArea>
        </Card>
  )
}

class PaperworkPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list_of_paperworks : this.props.paperworks,
      participant_id: this.props.participantId,
    };
  }

  render() {
    return (
      <Container maxWidth={"sm"} style={styles.containerStyle}>
          <Grid 
            container direction={'row'} 
            style={styles.componentTitle} 
            spacing={2}
          >
            <Grid item>
              <Typography variant="h4">
                Paperworks
              </Typography>
            </Grid>
            <Grid item>
              <PaperworkForm participant_id={this.state.participant_id}/>
            </Grid>
          </Grid>
           <List style={styles.listStyle} dense={true}>
            {
              this.state.list_of_paperworks.map(paperwork => {
                return <PaperworkEntry 
                          agree={paperwork.agree}
                          key={paperwork.id}
                          link={paperwork.link}
                          title={paperwork.title}
                          date={paperwork.created_at}
                        />;
              })
            }
          </List>
      </Container>
    )
  }
}

export default PaperworkPage;
