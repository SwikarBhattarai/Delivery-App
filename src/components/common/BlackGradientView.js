import React from "react";
import {
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  StatusBar,
} from "react-native";
import IconBadge from "react-native-icon-badge";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, Icons, hp, wp, Fonts, nf } from "../../constants/constants";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "react-native-dynamic-search-bar";
import { useSelector } from "react-redux";

const BlackGradientView = ({
  children,
  showBack = false,
  onBack,
  showCart,
  showSearch,
  title,
}) => {
  const navigation = useNavigation();

  const { cart } = useSelector((state) => ({
    cart: state.cartReducer.cart,
  }));

  console.log("cart", cart);

  return (
    <View style={{ flex: 1}}>
      <View style={{ height: hp(20), width: "100%" }} />
      <View style={{ flex: 1, marginTop: -hp(15) }}>
        {title ? <Text style={{fontFamily: Fonts.bold, fontSize: nf(21), color: Colors.darkBlack, textAlign:'center', marginVertical: hp(3)}}>{title}</Text> : null}
        {(showBack || showCart) && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: hp(2),
              marginHorizontal: wp(5),
            }}
          >
            {showSearch && (
              <SearchBar
                fontColor="#c6c6c6"
                style={{ width: wp(75) }}
                iconColor="#c6c6c6"
                shadowColor="#282828"
                cancelIconColor="#c6c6c6"
                placeholder="Search restaurants, foods.."
                onPress={() => alert("onPress")}
                onChangeText={(text) => console.log(text)}
              />
            )}
            {!showBack ? null : (
              <TouchableOpacity
                onPress={() => (onBack ? onBack() : navigation.goBack())}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: wp(12) }}
                  source={Icons.back_arrow_gradient}
                />
              </TouchableOpacity>
            )}
            {showCart && (
              <TouchableOpacity
                style={{ marginLeft: "auto" }}
                onPress={() => navigation.navigate("CartScreen", cart)}
              >
                <IconBadge
                  MainElement={
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        margin: 6,
                      }}
                    >
                      <Icon name="shopping-cart" size={40} />
                    </View>
                  }
                  BadgeElement={
                    <Text style={{ color: "#FFFFFF" }}>
                      {cart && cart.length}
                    </Text>
                  }
                  IconBadgeStyle={{
                    width: 20,
                    height: 20,
                    backgroundColor: Colors.orange,
                  }}
                  Hidden={cart && cart.length === 0}
                />
              </TouchableOpacity>
            )}
          </View>
        )}

        {children}
      </View>
    </View>
  );
};

export default BlackGradientView;
