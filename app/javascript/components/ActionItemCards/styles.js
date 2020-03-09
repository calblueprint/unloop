export const styles = theme => ({
  card: {
    display: 'flex',
    flexdirection: 'row',
    justifycontent: 'start',
    border: '0.5px solid #5870EB',
    height: '100px',
  },
  rectangle: {
    width: '70px',
    height: '5px',
    background: '#5870EB',
    borderradius: '20px',
    transform: 'rotate(-90deg)',
  },
  assign: {
    fontfamily: 'Inter',
    fontstyle: 'normal',
    fontweight: 'bold',
    fontsize: '12px',
    lineheight: '16px',
    color: '#5870EB',
  },
  '& :active': {
    color: 'rgb(58, 74, 156)',
  },
  text: {
    color: '#8E8E8E',
    fontfamily: 'Inter',
    fontstyle: 'normal',
    fontsize: '8px',
    flexgrow: 2,
  },
});

export default styles;
