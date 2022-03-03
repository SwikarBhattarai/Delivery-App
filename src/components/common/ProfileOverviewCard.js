import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Colors, Icons, Fonts, wp, hp, nf } from "../../constants/constants";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { navigate } from "../../routing/NavigationService";

const ProfileOverviewCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.riContainer} onPress={onPress}>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: item.profileUri,
          }}
        />
        <View style={styles.infoContainer}>
          <View style={styles.information}>
            <Text style={styles.textBig} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.smallText}>{item.mainItems}</Text>
          </View>
          <TouchableOpacity style={{ marginLeft: "auto" }}>
            {!item.isFavourite ? (
              <Icon name="favorite" size={nf(20)} color={Colors.textRed} />
            ) : (
              <Icon
                name="favorite-border"
                size={nf(20)}
                color={Colors.orange}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileOverviewCard;

const styles = StyleSheet.create({
  text1: {
    color: Colors.white,
    fontSize: nf(16),
    fontFamily: Fonts.regular,
  },
  image: {
    height: hp(18),
    padding: hp(3),
    borderRadius: wp(1),
  },
  infoContainer: {
    flexDirection: "row",
    marginVertical: wp(2.5),
    padding: wp(2),
  },
  information: {
    justifyContent: "flex-start",
  },
  textBig: {
    marginRight: wp(12),
    color: Colors.darkBlack,
    fontSize: nf(18),
    fontFamily: Fonts.bold,
  },
  smallText: {
    lineHeight: hp(3),
    color: Colors.grey,
    fontSize: nf(12),
    fontFamily: Fonts.bold,
  },
  riContainer: {
    borderRadius: wp(1),
    padding: wp(1),
    backgroundColor: Colors.white,
  },
  gradientStyle: {
    borderTopLeftRadius: wp(3),
    borderBottomLeftRadius: wp(3),
    height: hp(25),
    width: wp(2),
  },
  secondView: { flex: 1, padding: wp(4), justifyContent: "space-between" },
  thirdView: {
    marginTop: hp(1.5),
    flexDirection: "row",
    width: wp(60),
    justifyContent: "space-between",
  },
});
