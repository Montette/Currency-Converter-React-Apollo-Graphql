import React, { Component } from 'react';

import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';

const theme = {
    red: '#FF0000',
    black: '#393939',
    grey: '#3A3A3A',
    lightgrey: '#E1E1E1',
    offWhite: '#EDEDED',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
    bcgColor: '#f1f1f1',
    textColor: '#5a5a5a'
  };
  

const StyledPage = styled.div`
  background: ${props => props.theme.bcgColor};
  color: ${props => props.theme.black};
  min-height: 100vh;
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
@import url(‘https://fonts.googleapis.com/css?family=Montserrat|Roboto');   

  html {
    box-sizing: border-box;
    font-size: 10px;
    min-height: 100vh;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: Roboto, sans-serif;
    min-height: 100vh;
    color: ${props => theme.textColor};
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'radnika_next'; }
  #root {
      height: 100vh;
  }
`;

class Page extends Component {
    render() {
        return (
            <>
                <GlobalStyle />
                <ThemeProvider theme={theme}>
                    <StyledPage>
                        <Inner>{this.props.children}</Inner>
                    </StyledPage>    
                </ThemeProvider>
            </>
        );
    }
}

Page.propTypes = {
    children: PropTypes.node.isRequired
}
export default Page;