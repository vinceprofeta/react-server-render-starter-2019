import React, { Component } from 'react';
import styled from 'styled-components';
import './test.css'

const Title = styled.h1`
  font-size: 100px;
  text-align: center;
  color: palevioletred;
`;


class Test extends Component {
  render() {
    return (
      <div className="test">
         <Title>
         TES ONE PAGE TEST 1
        </Title>
      </div>
    );
  }
}

export default Test;
