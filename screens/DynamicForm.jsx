import React from 'react';
import {View, Text, TextInput, ScrollView} from 'react-native';
import Heading from '../components/scouting_components/Heading';

const DynamicForm = ({formData}) => {
    return (
        <ScrollView>
            {formData.map((section, index) => {
                <View key={index}>
                    <Heading
                        title={section.section_name}
                        sectionHeading={true}
                    />
                </View>;
            })}
        </ScrollView>
    );
};

export default DynamicForm;

// EX

// import React from 'react';
// import { View, Text, TextInput, ScrollView } from 'react-native';

// const DynamicForm = ({ formData }) => {
//   return (
//     <ScrollView>
//       {formData.map((section, index) => (
//         <View key={index}>
//           <Text>{section.section_name}</Text>
//           {section.form_data.map((field, idx) => {
//             if (field.type === 'title') {
//               return <Text key={idx}>{field.label}</Text>;
//             } else if (field.type === 'text') {
//               return (
//                 <TextInput
//                   key={idx}
//                   placeholder={field.label}
//                   onChangeText={text => console.log(text)} // Handle text change
//                 />
//               );
//             } else if (field.type === 'radio-group') {
//               return (
//                 <View key={idx}>
//                   <Text>{field.label}</Text>
//                   {field.options.map((option, i) => (
//                     <View key={i}>
//                       <Text>{option.label}</Text>
//                       {/* Implement radio button */}
//                     </View>
//                   ))}
//                 </View>
//               );
//             }
//             // Add more conditions for other field types as needed
//             return null;
//           })}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// export default DynamicForm;

