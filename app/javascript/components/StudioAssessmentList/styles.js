/*
 * PaperworkList Styles
 *
 * This contains all the styles for the PaperworkList component.
 */

const styles = theme => ({
  containerStyle: {
    padding: '18px 28px',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    marginRight: 0,
  },
  componentTitle: {
    paddingBottom: 16,
    borderBottom: `5px solid ${theme.palette.primary.main}`,
  },
  headerStyle: {
    marginTop: '0px',
    marginBottom: '0px',
    fontSize: '24px',
  },
  noPaperworksImg: {
    width: '50%',
    height: '50%',
    display: 'block',
    marginTop: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  paddingBox: {
      marginLeft: '20px',
      padding: '10px',
      display: 'flex',
      boxShadow: '5px',
      justifyContent: 'space-between',
  },
  noPaperworksTxt: {
    textAlign: 'center',
  },
});

export default styles;
