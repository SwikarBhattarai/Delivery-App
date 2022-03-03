import React from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BlackGradientView,
  CustomButton4,
  CustomButton3,
  SquareCard,
} from "../common";
import { Colors, Icons, Fonts, wp, hp, nf } from "../../constants/constants";
import ReferSomeoneModal from "./ReferSomeoneModal";
import { useState } from "react";
import MessagesModal from "./MessagesModal";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../../store/ActionTypes";
import CreateTeamModal from "./CreateTeamModal";
import { TeamsCardsNotched, AddAnotherGameCardBlack } from "../common";

export default function MainTeamsScreen({ navigation }) {
  const renderFlatList = ({ item, index }) => {
    return <SquareCard item={item} orderId={item.orderId} orderStatus={item.orderStatus} />;
  };

  return (
    <BlackGradientView title="My Orders">
      <ScrollView style={styles.container}>
        <FlatList
          ItemSeparatorComponent={() => <View style={{ height: hp(2) }} />}
          contentContainerStyle={{
            marginBottom: hp(20),
            marginHorizontal: wp(5),
          }}
          data={[
            {
              id: 1,
              name: "Chicken Momo",
              price: 200,
              quantity: 2,
              imageUri: "https://picsum.photos/500",
              orderId: "#13453434",
              orderStatus: 0,
            },
            {
              id: 2,
              name: "Veg Momo",
              price: 160,
              quantity: 1,
              imageUri: "https://picsum.photos/500",
              orderId: "#13453434",
              orderStatus: 0,
            },
            {
              id: 3,
              name: "Veg Chowmein",
              price: 60,
              quantity: 1,
              imageUri: "https://picsum.photos/500",
              orderId: "#13453434",
              orderStatus: 1,
            },
            {
              id: 4,
              name: "Chicken Chowmein",
              price: 80,
              quantity: 1,
              imageUri: "https://picsum.photos/500",
              orderId: "#13453434",
              orderStatus: 1,
            },
            {
              id: 5,
              name: "Chicken Khaja Set with Chicken curry and Vatmas Sadeko",
              price: 150,
              quantity: 1,
              imageUri: "https://picsum.photos/500",
              orderId: "#13453434",
              orderStatus: 1,
            },
            {
              id: 5,
              name: "Chicken Khaja Set with Chicken curry and Vatmas Sadeko",
              price: 150,
              quantity: 1,
              imageUri: "https://picsum.photos/500",
              orderId: "#13453434",
              orderStatus: 1,
            },
            {
              id: 5,
              name: "Chicken Khaja Set with Chicken curry and Vatmas Sadeko",
              price: 150,
              quantity: 1,
              imageUri: "https://picsum.photos/500",
              orderId: "#13453434",
              orderStatus: 1,
            },
            {
              id: 5,
              name: "Chicken Khaja Set with Chicken curry and Vatmas Sadeko",
              price: 150,
              quantity: 1,
              imageUri: "https://picsum.photos/500",
              orderId: "#13453434",
              orderStatus: 1,
            },
            {
              id: 5,
              name: "Chicken Khaja Set with Chicken curry and Vatmas Sadeko",
              price: 150,
              quantity: 1,
              imageUri: "https://picsum.photos/500",
              orderId: "#13453434",
              orderStatus: 1,
            },
            {
              id: 5,
              name: "Chicken Khaja Set with Chicken curry and Vatmas Sadeko",
              price: 150,
              quantity: 1,
              imageUri: "https://picsum.photos/500",
              orderId: "#13453434",
              orderStatus: 1,
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
  },
  text1: {
    marginTop: hp(3),
    color: Colors.darkBlack,
    fontSize: nf(21),
    fontFamily: Fonts.bold,
    textAlign: "center",
  },
});
