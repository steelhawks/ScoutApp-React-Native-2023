import React from 'react';
import {NumberInput, CustomTextInput, RadioGroup, Dropdown, CheckboxGroup} from '../index';

const Input = props => {
  const INPUTS = {
    Number: <NumberInput {...props} />,
    Text: <CustomTextInput />,
    RadioGroup: <RadioGroup />,
    Dropdown: <Dropdown />,
    CheckboxGroup: <CheckboxGroup {...props}/>
  };

  return <>{INPUTS[props.type]}</>;
};

export default Input;
