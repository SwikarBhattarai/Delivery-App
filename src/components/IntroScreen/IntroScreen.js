import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Colors, Icons, Fonts, wp, hp, nf } from "../../constants/constants";
import Swiper from "react-native-swiper";
import { useDispatch } from "react-redux";
import { CustomButton1, inAppBrowserStyle } from "../common";
import Icon from "react-native-vector-icons/MaterialIcons";
import { tryDeepLinking } from "../common/InAppBrowserOpen";

const IntroScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const createAccountAction = () => {
    navigation.navigate("ConfirmEligibility");
  };
  const twitchAuthFunc = () => {
    tryDeepLinking(dispatch, false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={Icons.bg_accent}
        resizeMode="contain"
        style={{
          height: hp(20),
          width: "100%",
          position: "absolute",
          zIndex: 1,
        }}
      />
      <Swiper
        style={styles.wrapper}
        dot={
          <Image
            style={{ marginHorizontal: wp(2) }}
            source={Icons.slider_light}
          />
        }
        activeDot={
          <Image
            style={{ marginHorizontal: wp(2) }}
            source={Icons.slider_colored}
          />
        }
      >
        <View style={styles.slideI}>
          <Image
            resizeMode="contain"
            style={styles.imgStl}
            source={Icons.add_to_cart}
          />
          <Text style={styles.headerText}>Add to Cart</Text>
          <Text style={styles.contentText}>
            Choose your favourite items from your favourite vendors.
          </Text>
        </View>
        <View style={styles.slideI}>
          <Image
            resizeMode="contain"
            style={styles.imgStl}
            source={Icons.package}
          />
          <Text style={styles.headerText}>Order Preparation</Text>
          <Text style={styles.contentText}>
            We ensure your items are well packaged before it gets deliver to
            you.
          </Text>
        </View>
        <View style={styles.slideI}>
          <Image
            resizeMode="contain"
            style={styles.imgStl}
            source={Icons.deliver}
          />
          <Text style={styles.headerText}>Delivery to your door</Text>
          <Text style={styles.contentText}>
            We will deliver your order to to your doorstep.
          </Text>
        </View>
      </Swiper>

      <View style={{ flex: 0.3, alignItems: "center" }}>
        <CustomButton1
          onPress={createAccountAction}
          image={Icons.facebook}
          imageStyle={{ height: nf(30), width: nf(30), marginRight: wp(1) }}
          title={"SIGN UP WITH FACEBOOK"}
        />
        <TouchableOpacity onPress={twitchAuthFunc} style={{ marginTop: hp(5) }}>
          <Text style={styles.text}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  wrapper: { marginTop: hp(16) },
  slideI: {
    alignItems: "center",
  },
  text: {
    color: Colors.textRed,
    fontSize: nf(16),
    fontFamily: Fonts.bold,
  },
  headerText: {
    color: Colors.darkBlack,
    fontSize: nf(16),
    fontFamily: Fonts.bold,
    textAlign: "center",
    width: wp(85),
    marginTop: hp(6),
  },
  contentText: {
    color: Colors.darkBlack,
    fontSize: nf(16),
    fontFamily: Fonts.regular,
    textAlign: "center",
    width: wp(85),
    marginTop: hp(2),
  },
  imgStl: { height: hp(22), width: wp(80) },
});
