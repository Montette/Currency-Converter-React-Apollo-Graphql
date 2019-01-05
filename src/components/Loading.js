import React from 'react';
import styled, { keyframes } from 'styled-components';

const loadingCircle = keyframes`
0% { 
    stroke-dashoffset: 0
  }
      100% { 
    stroke-dashoffset: -600;
  }
`;

const loading = keyframes`
0% { 
    transform: rotate(0); 
  }
      100% { 
    transform: rotate(360deg);
  }
`;

const StyledSvg = styled.svg`
    width: 120px;
    animation: ${loading} 3s linear infinite;
        #loading-inner { 
            stroke-dashoffset: 0;
            stroke-dasharray: 300;
            stroke-width: 10;
            stroke-miterlimit: 10;
            stroke-linecap: round; 
            animation: ${loadingCircle} 2s linear infinite;
            stroke: #51BBA7;
            fill: transparent;
        }   

`
const StyledHeader = styled.h2`
    text-align: center;
    font-size: 20px;
    margin-bottom: 1em;
    font-weight: 300;
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${props => props.theme.bcgColor};
    padding-top: 80px;
`

const FixedContainer = styled(StyledContainer)`
    padding-top: 20%;
    position fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`
const Loading = ({ isFixed }) => {

    const StyledComponent = isFixed ? FixedContainer : StyledContainer;

    return (
        <StyledComponent>
            <StyledHeader>Loading...</StyledHeader>
            <StyledSvg x="0px" y="0px" viewBox="0 0 150 150">
                <circle id="loading-inner" cx="75" cy="75" r="60"/>
            </StyledSvg>
        </StyledComponent>
    )
};

export default Loading