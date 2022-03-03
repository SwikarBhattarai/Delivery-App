import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { types } from "../../store/ActionTypes";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors, hp, wp, Icons, nf, Fonts } from "../../constants/constants";

const FooterTab = () => {
  const dispatch = useDispatch();
  const { footerIndex } = useSelector(
    (state) => ({
      footerIndex: state.globalReducer.footerIndex,
    }),
    shallowEqual
  );

  const onPressTabBtn = (index) => {
    dispatch({
      type: types.CHANGE_FOOTER_INDEX,
      payload: index,
    });
  };

  return (
    <View style={styles.shadow}>
      <TouchableOpacity
        disabled={footerIndex == 0}
        style={{ height: hp(8), width: wp(20), justifyContent: "center" }}
        onPress={() => onPressTabBtn(0)}
      >
        {footerIndex == 0 ? (
          <View style={[styles.selectedView, { marginStart: 0 }]}>
            <Icon name="home" size={30} color={Colors.white} />
            <Text style={styles.selectedText}>Home</Text>
          </View>
        ) : (
          <View style={[styles.deselectedView, { marginStart: 0 }]}>
            <Icon name="home" size={30} color={Colors.orange} />
            <Text style={styles.deselectedText}>Home</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        disabled={footerIndex == 1}
        style={{ height: hp(8), width: wp(20), justifyContent: "center" }}
        onPress={() => onPressTabBtn(1)}
      >
        {footerIndex == 1 ? (
          <View style={[styles.selectedView, { marginStart: 0 }]}>
            <Icon name="history" size={30} color={Colors.white} />
            <Text style={styles.selectedText}>My Orders</Text>
          </View>
        ) : (
          <View style={[styles.deselectedView, { marginStart: 0 }]}>
            <Icon name="history" size={30} color={Colors.orange} />
            <Text style={styles.deselectedText}>My Orders</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        disabled={footerIndex == 2}
        style={{ height: hp(8), width: wp(20), justifyContent: "center" }}
        onPress={() => onPressTabBtn(2)}
      >
        {footerIndex == 2 ? (
          <View style={[styles.selectedView, { marginStart: 0 }]}>
            <Icon name="user" size={30} color={Colors.white} />
            <Text style={styles.selectedText}>Profile</Text>
          </View>
        ) : (
          <View style={[styles.deselectedView, { marginStart: 0 }]}>
            <Icon name="user" size={30} color={Colors.orange} />
            <Text style={styles.deselectedText}>Profile</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FooterTab;

const styles = StyleSheet.create({
  shadow: {
    height: hp(10),
    width: wp(90),
    borderRadius: 50,
    backgroundColor: Colors.white,
    borderWidth: nf(1),
    borderColor: Colors.orange,
    position: "absolute",
    bottom: hp(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(5),
    alignSelf: "center",

    //box shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  selectedText: {
    color: Colors.white,
    fontSize: nf(12),
    fontFamily: Fonts.regular,
  },
  deselectedView: {
    marginTop: hp(1),
    marginStart: wp(4),
    alignItems: "center",
  },
  selectedView: {
    marginTop: hp(1),
    padding: nf(4),
    borderRadius: nf(4),
    backgroundColor: Colors.orange,
    marginStart: wp(4),
    alignItems: "center",
  },
  deselectedText: {
    color: Colors.secondaryDark,
    fontSize: nf(12),
    fontFamily: Fonts.regular,
  },
});
