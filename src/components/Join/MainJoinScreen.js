import React, { createRef, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import IconBadge from "react-native-icon-badge";
import Carousel from "react-native-snap-carousel";
import {
  BlackGradientView,
  CustomButton1,
  ProfileOverviewCard,
} from "../common";
import { Colors, Icons, Fonts, wp, hp, nf } from "../../constants/constants";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { shallowEqual, useSelector } from "react-redux";

export default function MainJoinScreen({ navigation, cart }) {

  const carouselRef = useRef("");

  const [setActiveIndex, activeIndex] = useState(0);

  const _renderItem = ({ item, index }) => {
    return (
      //   <View
      //     style={{
      //       backgroundColor: "floralwhite",
      //       borderRadius: 5,
      //       height: 250,
      //       padding: 50,
      //     }}
      //   >
      //     <Text style={{ fontSize: 30 }}>{item.title}</Text>
      //     <Text>{item.text}</Text>
      //   </View>
      <ProfileOverviewCard
        item={item}
        onPress={() => navigation.navigate("MenuScreen", { item })}
      />
    );
  };

  const renderFlatList = ({ item, index }) => {
    return (
      <ProfileOverviewCard
        item={item}
        onPress={() => navigation.navigate("MenuScreen", { item })}
      />
    );
  };
  return (
    <BlackGradientView showCart showSearch>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: hp(5), marginBottom: hp(3) }}>
          <Text style={styles.text3}>Most Popular near You</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Carousel
            layout={"default"}
            ref={carouselRef}
            data={[
              {
                name: "Chatta Mitho Cafe",
                mainItems: "Momo, Chowmein, Khaja Set",
                profileUri: "https://picsum.photos/500",
              },
              {
                name: "Hotel Old Durbar",
                mainItems: "Momo, Chowmein, Khaja Set",
                profileUri: "https://picsum.photos/500",
              },
              {
                name: "Hotel Gravity Inn",
                mainItems: "Momo, Chowmein, Khaja Set",
                profileUri: "https://picsum.photos/500",
              },
              {
                name: "Hotel Town Hall",
                mainItems: "Momo, Chowmein, Khaja Set",
                profileUri: "https://picsum.photos/500",
              },
              {
                name: "Odaan Restaurant and Lounge",
                mainItems: "Momo, Chowmein, Khaja Set",
                profileUri: "https://picsum.photos/500",
              },
            ]}
            sliderWidth={wp(80)}
            itemWidth={wp(80)}
            renderItem={_renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
        </View>
        <View style={{ marginTop: hp(5), marginBottom: hp(3) }}>
          <Text style={styles.text3}>Special Deals</Text>
        </View>
        <FlatList
          ItemSeparatorComponent={() => <View style={{ height: hp(2) }} />}
          contentContainerStyle={{ marginBottom: hp(20) }}
          data={[
            {
              name: "Chatta Mitho Cafe",
              mainItems: "Momo, Chowmein, Khaja Set",
              profileUri: "https://picsum.photos/500",
            },
            {
              name: "Hotel Old Durbar",
              mainItems: "Momo, Chowmein, Khaja Set",
              profileUri: "https://picsum.photos/500",
            },
            {
              name: "Hotel Gravity Inn",
              mainItems: "Momo, Chowmein, Khaja Set",
              profileUri: "https://picsum.photos/500",
            },
            {
              name: "Hotel Town Hall",
              mainItems: "Momo, Chowmein, Khaja Set",
              profileUri: "https://picsum.photos/500",
            },
            {
              name: "Odaan Restaurant and Lounge",
              mainItems: "Momo, Chowmein, Khaja Set",
              profileUri: "https://picsum.photos/500",
            },
          ]}
          renderItem={renderFlatList}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </BlackGradientView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp(5),
  },
  text3: {
    color: Colors.darkBlack,
    fontSize: nf(21),
    fontFamily: Fonts.bold,
  },
  basket: {},
});
