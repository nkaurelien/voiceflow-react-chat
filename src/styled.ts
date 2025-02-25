import { styled } from 'styled-components';

export const DemoContainer = styled.div({
  position: 'absolute',
  right: '1rem',
  top: '3rem',
  bottom: '3rem',
  width: '400px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflowX: 'hidden',
  overflowY: 'scroll',

  '@media (max-width: 768px)': {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    border: 0,
    borderRadius: 0,
  },
});




export const CenterContainer = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '99vw',
  margin: 0,
  padding: 0,
  // overflow: 'hidden',
  // background: 'red',
  

  '@media (max-width: 768px)': {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    border: 0,
    borderRadius: 0,
  },
});


export const AppContainer = styled.div({
  position: 'relative',
  right: '0',
  left: '0',
  top: '3rem',
  margin: 0,
  // bottom: '3rem',
  width: '400px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflowX: 'hidden',
  overflowY: 'hidden',
  height: '90vh',


  '@media (max-width: 768px)': {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    border: 0,
    borderRadius: 0,
  },
});
