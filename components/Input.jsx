import React from 'react';
import {NumberInput, CustomTextInput, Dropdown, RadioGroup} from './inputs';



const Input = props => {
  // var input_return;

  // () => {
  //   switch(props.type) {
  //     case "Number":
  //       input_return = <NumberInput {...props}/>;
  //   };
  // };
  const INPUTS = {
    "Number": <NumberInput {...props}/>,
    "Text": <CustomTextInput/>,
    "Radio-Group": <RadioGroup/>,
    "Dropdown": <Dropdown/>
  };

  return (
    <>
      {INPUTS[props.type]}     
    </>
  );
};

{/* <NumberInput {...props}/> */}
      {/* title={props.title} title_style={props.title_style} style={props.style} */}
      {/* <Text style={props.titleStyle}> {props.title} Event </Text>

      {props.type === 'text' ? (
        <TextInput
          maxLength={props.maxLength}
          style={props.style}
          val={props.val}
          onChangeText={props.onChangeText}></TextInput>
      ) : props.type === 'dropdown' ? (
        <Dropdown style={props.style} />
      ) : (
        <></> 
      )} */}

export default Input;