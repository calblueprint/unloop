export const styles = () => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    border: '0.5px solid #5870EB',
  },
  rectangle: {
    width: '5px',
    height: '70.93px',
    background: '#5870EB',
    borderRadius: '20px',
  },
  assign: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '16px',
    color: '#5870EB',
  },
  '& :active': {
    color: 'rgb(58, 74, 156)',
  },
  text: {
    color: '#8E8E8E',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontSize: '8px',
  },
  date: {
    color: '#8E8E8E',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '16px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '2',
  },
});

export default styles;
