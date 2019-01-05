import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
    width: 100px;
    font-size: 1.7rem;
`


const Input = ({onChangeValue, value}) => (
    <>
    <label for='currencyValue'>Enter amount to convert</label>
    <StyledInput name='currencyValue' className="form-control" type='number' value={value} step='0.01' min='0.00' onChange={onChangeValue}></StyledInput>
    </>
);

Input.propTypes = {
    value: PropTypes.string,
    onChangeValue: PropTypes.func
}

export default Input