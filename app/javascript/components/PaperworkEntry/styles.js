/*
 * PaperworkEntry Styles
 *
 * This contains all the styles for the PaperworkEntry component.
 */

export const styles = theme => ({
  card: {
    borderBottom: ({ lastEntry }) =>
      lastEntry ? '0px' : `.75px solid ${theme.palette.grey[400]}`,
    borderRadius: 0,
    boxShadow: '0px 0px 0px 0px',
    backgroundColor: 'inherit',
  },
});

export default styles;
