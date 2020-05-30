export const styles = theme => ({
  participantSelect: {
    position: 'absolute',
    right: '0px',
    horizontalAlign: 'right',
    float: 'right',
  },

  participant: {
    margin: '8px 0px',
    height: '36px',
    width: '100%',
    borderBottom: `.75px solid ${theme.palette.common.lightGrey}`,
  },

  participantBar: {
    width: '0.4rem',
    height: '36px',
    marginRight: '7%',
    borderRadius: '16px',
  },
});

export default styles;
