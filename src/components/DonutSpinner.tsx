import styled from 'styled-components';
import { keyframes } from 'styled-components';

const DonutSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const DonutSpinner = styled.div`
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${DonutSpin} 1.2s linear infinite;
`;

export default DonutSpinner;
