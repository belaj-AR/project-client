import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

/* 
    props list:

    headerTitle

*/

const Header = (props) => {
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.headerTitle}</Text>
        </View>
    )
    
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        backgroundColor: '#01579B'
    },
    text: {
        fontSize: 40,
        color: 'white',
    }
});

export default Header;