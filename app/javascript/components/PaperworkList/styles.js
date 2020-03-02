/*
 * PaperworkList Styles
 *
 * This contains all the styles for the PaperworkList component.
 */

export const styles = theme => ({
  containerStyle: {
    padding: '18px 28px',
    borderRadius: 10,
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
  listStyle: {
    paddingTop: 0,
    maxHeight: '600px',
    height: '53vh',
    overflow: 'auto',
    overflowX: 'hidden',
    overflowY: 'auto',
    paddingRight: '10px',
  },
  headerStyle: {
    marginTop: '0px',
    marginBottom: '0px',
    fontSize: '24px',
  },
});

export default styles;
