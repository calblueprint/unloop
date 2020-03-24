export const styles = () => ({
  card: {
    display: 'flex',
    flexdirection: 'row',
    justifycontent: 'start',
    border: '0.5px solid #5870EB',
  },
  rectangle: {
    width: '5px',
    height: '70.93px',
    background: '#5870EB',
    borderradius: '20px',
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
  },
  date: {
    color: '#8E8E8E',
    fontfamily: 'Inter',
    fontstyle: 'normal',
    fontweight: '500',
    fontsize: '12px',
    lineheight: '16px',
  },
  info: {
    display: 'flex',
    flexdirection: 'column',
    flexgrow: '2',
  },
});

export default styles;
