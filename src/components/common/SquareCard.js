import React from "react";
import { TouchableOpacity, StyleSheet, Image, View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CustomButton1, CustomButton2 } from ".";
import { Colors, wp, hp, Fonts, nf } from "../../constants/constants";

export default function SquareCard({
  onPress,
  item,
  isCart,
  removeItem,
  orderId,
  orderStatus,
}) {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.image}
        source={{
          uri: item.imageUri,
        }}
      />
      <View style={styles.container2}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.text3, { width: "70%" }]} numberOfLines={1}>
            {item.name}
          </Text>
          {isCart && (
            <TouchableOpacity
              style={{ marginLeft: "auto" }}
              onPress={() => removeItem(item)}
            >
              <Icon name="remove" size={nf(30)} color={Colors.redTest} />
            </TouchableOpacity>
          )}
          {orderId && (
            <TouchableOpacity style={{ marginLeft: "auto" }}>
              <Text
                style={{
                  color: Colors.darkBlack,
                  fontFamily: Fonts.regular,
                  fontSize: nf(12),
                }}
              >
                {orderId}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {!isCart && !orderId ? (
          <>
            <Text style={styles.text5}>{item.price} NPR</Text>
            <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
              <Text style={styles.text4}>Add to cart</Text>
            </TouchableOpacity>
          </>
        ) : orderId ? (
          <>
            <Text style={styles.text5}>&#215; {item.quantity}</Text>
            <Text style={styles.text5}>{item.price} NPR</Text>
            <View
              style={[
                styles.priceStyle,
                {
                  backgroundColor:
                    orderStatus === 0 ? Colors.blue : Colors.greenText,
                },
              ]}
            >
              <Text
                style={[
                  styles.text4,
                  { fontFamily: Fonts.regular, fontSize: nf(12) },
                ]}
              >
                {orderStatus === 0 ? "Pending" : "Delivered"}
              </Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.text5}>&#215; {item.quantity}</Text>
            <View style={styles.priceStyle}>
              <Text
                style={[
                  styles.text4,
                  { fontFamily: Fonts.bold, fontSize: nf(14) },
                ]}
              >
                {item.price} NPR
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 4,
    flexDirection: "row",
    borderRadius: wp(1),
    backgroundColor: Colors.white,
  },
  container2: {
    flex: 1,
    padding: nf(4),
    marginLeft: wp(5),
  },
  priceStyle: {
    marginLeft: "auto",
    padding: nf(8),
    alignSelf: "center",
    backgroundColor: Colors.orange,
    borderRadius: 50,
  },
  buttonStyle: {
    marginLeft: "auto",
    padding: nf(8),
    alignSelf: "center",
    backgroundColor: Colors.orange,
    borderRadius: 50,
  },
  image: {
    borderRadius: 8,
    height: hp(10),
    width: wp(20),
    resizeMode: "contain",
  },
  text3: {
    color: Colors.darkBlack,
    fontSize: nf(18),
    fontFamily: Fonts.medium,
  },
  text5: {
    marginTop: 4,
    color: Colors.darkBlack,
    fontSize: nf(14),
    fontFamily: Fonts.medium,
  },
  text4: {
    color: Colors.white,
    fontSize: nf(12),
    fontFamily: Fonts.regular,
  },
});
