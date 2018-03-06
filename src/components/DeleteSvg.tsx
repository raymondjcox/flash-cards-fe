import * as React from 'react';
import styled from 'styled-components';

const StyledSvg = styled.svg`
  path, polygon {
    transition: fill .5s;
  }
  &:hover {
    path, polygon {
      fill: #d81c1c;
    }
  }
  path, polygon {
    fill: #b54949;
  }
`;

interface Props {
  onClick: Function;
}

class DeleteSvg extends React.Component<Props> {
  render() {
    return (
      <StyledSvg onClick={() => this.props.onClick()} className="delete-svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100"><polygon points="64.323,22.546 49.998,36.875 35.671,22.55 23.391,34.829 37.717,49.158 23.391,63.484 35.671,75.765 49.998,61.434   64.323,75.765 76.611,63.484 62.28,49.158 76.611,34.829 "/><path d="M85.352,14.646C75.594,4.883,62.801,0,50.002,0c-12.801,0-25.594,4.883-35.36,14.646c-19.523,19.525-19.523,51.182,0,70.706  C24.408,95.117,37.201,100,50.002,100c12.799,0,25.592-4.883,35.35-14.648C104.883,65.828,104.883,34.171,85.352,14.646z   M79.834,79.834c-7.967,7.963-18.563,12.354-29.832,12.354c-11.267,0-21.867-4.391-29.834-12.354C12.201,71.863,7.81,61.271,7.81,50  c0-11.269,4.391-21.861,12.357-29.83c7.967-7.967,18.567-12.355,29.834-12.355c11.27,0,21.865,4.388,29.832,12.355l0,0  C87.801,28.139,92.188,38.731,92.188,50C92.188,61.271,87.801,71.863,79.834,79.834z"/>
      </StyledSvg>
    );
  }
}
export default DeleteSvg;
