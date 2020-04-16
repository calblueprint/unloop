/*
 * PaperworkEntry Styles
 *
 * This contains all the styles for the PaperworkEntry component.
 */

const styles = theme => ({
  card: {
    borderBottom: ({ lastEntry }) =>
      lastEntry ? '0px' : `.75px solid ${theme.palette.common.lightGrey}`,
    borderRadius: 0,
    boxShadow: '0px 0px 0px 0px',
    backgroundColor: 'inherit',
  },
});

export default styles;
