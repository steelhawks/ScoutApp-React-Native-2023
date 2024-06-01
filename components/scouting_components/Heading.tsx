import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface HeadingProps {
    title: string | undefined | null;
    sectionHeading?: boolean;
}

const Heading: React.FC<HeadingProps> = props => {
    return (
        <Text
            style={
                props.sectionHeading
                    ? styles.SectionHeading
                    : styles.QueryHeading
            }>
            {props.title}
        </Text>
    );
};

const styles = StyleSheet.create({
    SectionHeading: {
        fontSize: 50,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white',
    },
    QueryHeading: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 25,
        color: 'white',
    },
});

export default Heading;
