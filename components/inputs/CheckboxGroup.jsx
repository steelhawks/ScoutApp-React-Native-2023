import Checkbox from './Checkbox';
import {View} from 'react-native';

const CheckboxGroup = props => {
    // removes duplicates in array provided for checkbox group and creates a new array
    var new_opts = props.opts.filter(
        (opt, index) => props.opts.indexOf(opt) === index,
    );

    return (
        <View>
        	{/* Create checkboxes by mapping out the array provided  */}
            {new_opts.map(checkboxValue => (
                <Checkbox label={checkboxValue} />
            ))}
        </View>
    );
};

export default CheckboxGroup;
