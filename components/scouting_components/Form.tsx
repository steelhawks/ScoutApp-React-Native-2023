import {View} from 'react-native';
import React from 'react';

const Form = (props: { sections: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
    return <View>{props.sections}</View>;
};

export default Form;
