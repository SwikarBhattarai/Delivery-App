import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, hp, Icons, wp, nf } from '../../constants/constants'

export const TLBRNotchedCornerView = ({ icon = null, text = '', onPress, children, style, cutOffTopLeftStyle, cutOffBottomRightStyle }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.buttonStyle, style]}
        >
            { children ??
                <>
                    <Icon name={icon} style={styles.icon} size={nf(30)} />
                    <Text style={styles.textStyle}>{text}</Text>
                </>
            }
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#696969',
        alignItems: "center",
        justifyContent: "center",
        height: hp(15),
        width: wp(40),
        borderRadius: nf(4),
        margin: 10
    },
    icon:{
        color: Colors.white,
    },
    textStyle: {
        color: "#FFFFFF",
        marginTop: hp(1)
    },
    cutOffTopLeft: {
        position: "absolute",
        left: 0,
        top: 0,
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderTopColor: "#000",
        borderRightColor: "transparent",
    },
    cutOffBottomRight: {
        position: "absolute",
        right: 0,
        bottom: 0,
        borderLeftWidth: 10,
        borderBottomWidth: 10,
        borderBottomColor: "#000",
        borderLeftColor: "transparent",
    },
    cutOffTopRight: {
        position: "absolute",
        right: 0,
        top: 0,
        borderLeftWidth: 10,
        borderTopWidth: 10,
        borderTopColor: "#000",
        borderLeftColor: "transparent",
    },
    cutOffBottomLeft: {
        position: "absolute",
        left: 0,
        bottom: 0,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderBottomColor: "#000",
        borderRightColor: "transparent",
    },
});