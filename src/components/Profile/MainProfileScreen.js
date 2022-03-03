import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  View,
  useWindowDimensions,
} from "react-native";
import { Colors, Icons, Fonts, wp, hp, nf } from "../../constants/constants";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { OverviewProfile, HistoryProfile, AccountProfile } from "./index";
import { useSelector } from "react-redux";

export default function MainProfileScreen({ navigation }) {
  const userData = useSelector((state) => state.authReducer.userData);

  //react-native-tab-view start
  const [index, setIndex] = useState(0);
  const [routes] = useState([{ key: "first", title: "My Account" }]);
  const renderScene = SceneMap({
    first: AccountProfile,
  });
  const _handleIndexChange = (index) => setIndex(index);
  const _renderTabBar = (props) => {
    return (
      <View style={{ marginTop: hp(2) }}>
        <TabBar
          {...props}
          renderLabel={({ route, focused, color }) => (
            <Text style={{ color: Colors.darkBlack, fontFamily: Fonts.medium, fontSize: nf(18), margin: 8 }}>{route.title}</Text>
          )}
          indicatorStyle={{ backgroundColor: "white" }}
          style={{ backgroundColor: Colors.white }}
        />
      </View>
    );
  };
  //react-native-tab-view ends

  return (
    <View style={{ flex: 1 }}>
      <Image
        resizeMode="stretch"
        source={Icons.bg_accent_red_top}
        style={{ height: hp(15), width: wp(100) }}
      />
      <View style={styles.profileImageConatiner}>
        <Image
          style={styles.profileImage}
          source={{ uri: userData?.twitchProfileImage }}
        />
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(i) => _handleIndexChange(i)}
        renderTabBar={_renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    color: Colors.darkBlack,
    fontSize: nf(24),
    fontFamily: Fonts.bold,
    marginTop: hp(2),
  },
  text2: {
    color: Colors.darkBlack,
    fontSize: nf(16),
    fontFamily: Fonts.regular,
  },
  text3: {
    color: Colors.darkBlack,
    fontSize: nf(16),
    fontFamily: Fonts.regular,
    marginTop: hp(1),
  },
  textTab: {
    color: Colors.darkBlack,
    fontSize: nf(16),
    fontFamily: Fonts.bold,
    marginBottom: hp(0.5),
  },
  whiteCircleView: {
    backgroundColor: Colors.darkBlack,
    alignSelf: "center",
    padding: wp(10),
    marginTop: hp(5),
    borderRadius: wp(30),
  },
  notificationView: {
    height: hp(8),
    width: wp(95),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: hp(5),
    borderRadius: wp(2),
    backgroundColor: Colors.cardGreyBg,
    paddingHorizontal: wp(5),
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: wp(3),
  },
  profileImageConatiner: {
    height: wp(25),
    width: wp(25),
    backgroundColor: Colors.white,
    alignSelf: "center",
    marginTop: -hp(6),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.textRed,
    borderRadius: wp(25),
    justifyContent: "center",
  },
  profileImage: {
    height: wp(15),
    width: wp(15),
    alignSelf: "center",
  },
});
