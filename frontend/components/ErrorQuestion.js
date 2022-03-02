import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {
    StyleSheet,
    Text,
    Button,
    View
} from 'react-native';


const ErrorQuestion = () => {
    return (
        <View style={styles.containerMain}>

            {/* answer area*/}
            <View>
                <Text> Error question</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default ErrorQuestion;