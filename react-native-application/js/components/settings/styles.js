
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceWidth = Dimensions.get('window').width;

export default{
    container: {
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        marginBottom: 15,
        alignItems: 'center',
        color: '#000000',
    },
    input: {
        marginBottom: 20,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
    },
    view: {
        paddingLeft: 20,
    },
    icon: {
        color: '#000000',
    },
    btn: {
        marginTop: 0,
        alignSelf: 'center',
        width: deviceWidth / 1.1,
        justifyContent: 'center',
        // backgroundColor: '#55bc95',
    },
    btnText: {
        color: '#ffffff',
    },
};
