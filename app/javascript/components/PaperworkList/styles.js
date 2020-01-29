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
    maxHeight: '700px',
    height: '60vh',
    overflow: 'auto',
    overflowX: 'hidden',
    overflowY: 'auto',
    paddingRight: '10px',
  },
});

export default styles;
