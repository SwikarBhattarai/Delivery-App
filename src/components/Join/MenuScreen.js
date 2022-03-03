import React, { createRef, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import cloneDeep from "lodash/cloneDeep";
import InputSpinner from "react-native-input-spinner";
import Carousel from "react-native-snap-carousel";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  BlackGradientView,
  CustomButton1,
  ProfileOverviewCard,
  SquareCard,
} from "../common";
import { Colors, Icons, Fonts, wp, hp, nf } from "../../constants/constants";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { types } from "../../store/ActionTypes";

export default function MainJoinScreen({ navigation, route }) {
  const [item, setItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedItemPrice, setSelectedItemPrice] = useState(null);

  const sheetRef = createRef();

  const dispatch = useDispatch();

  const { cart } = useSelector((state) => ({
    cart: state.cartReducer.cart,
  }));

  useEffect(() => {
    // do stuff
    console.log("cart", cart);
  }, [cart]);

  useEffect(() => {
    setSelectedItemPrice(selectedItem?.price);
  }, [selectedItem]);

  useEffect(() => {
    console.log("route", route.params.item);

    if (route?.params) {
      setItem(route?.params?.item);
    }
  }, [route]);

  const onOpenCart = (item) => {
    setSelectedItem(item);
    sheetRef.current.open();
  };

  const addToCart = () => {
    // let selectedItem = selectedItem;
    const item = {
      ...selectedItem,
      price: selectedItemPrice,
      quantity: selectedQuantity,
    };
    cart.push(item);

    console.log("cart", cart);
    dispatch({
      type: types.CART_ITEMS,
      payload: cart,
    });
    // selectedItem.price = selectedItemPrice;
    // selectedItem.quantity = selectedQuantity

    sheetRef.current.close();
  };

  const renderFlatList = ({ item, index }) => {
    return <SquareCard item={item} onPress={() => onOpenCart(item)} />;
  };
  return (
    <BlackGradientView
      showBack
      showCart
      cart={cart}
    >
      <RBSheet
        ref={sheetRef}
        closeOnDragDown
        onClose={() => {
          setSelectedItem(null);
          setSelectedQuantity(1);
        }}
        height={hp(32)}
      >
        <View style={{ padding: wp(4) }}>
          <Text style={styles.text3} numberOfLines={1}>{selectedItem?.name}</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: hp(3),
              marginBottom: hp(5),
            }}
          >
            <InputSpinner
              style={{ width: wp(50) }}
              max={15}
              min={1}
              step={1}
              value={1}
              colorMax={Colors.disabled}
              onChange={(num) => {
                setSelectedQuantity(num);
                setSelectedItemPrice(num * selectedItem.price);
              }}
              skin="modern"
            />
            <Text style={[{ marginLeft: "auto" }, styles.text3]}>
              {selectedItemPrice} NPR
            </Text>
          </View>
          <View></View>
          <View style={{ marginTop: "auto", alignItems: "center" }}>
            <CustomButton1
              onPress={addToCart}
              title="Add To Cart"
              textStyle={{ color: Colors.white }}
              style={{ backgroundColor: Colors.orange }}
            />
          </View>
        </View>
      </RBSheet>
      {item ? (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginVertical: hp(2) }}>
            <Text style={styles.text3}>{item.name}</Text>
          </View>
          <Image
            style={styles.image}
            source={{
              uri: item.profileUri,
            }}
          />
          <View style={{marginTop: hp(3), marginVertical: hp(2), flexDirection:'row' }}>
            <Text style={[styles.text1, {color: Colors.greenText}]}>Delivery Hours: </Text>
            <Text style={[styles.text1]}>10 AM - 8 PM (Sun-Fri)</Text>
          </View>

          <View style={{ marginBottom: hp(2) }}>
            <Text style={styles.text2}>Menu</Text>
          </View>
         <FlatList
            ItemSeparatorComponent={() => <View style={{ height: hp(2) }} />}
            contentContainerStyle={{ marginBottom: hp(20) }}
            data={[
              {
                 id: 1,
                name: "Chicken Momo",
                price: 100,
                imageUri: "https://picsum.photos/500",
              },
              {
                id: 2,
                name: "Veg Momo",
                price: 80,
                imageUri: "https://picsum.photos/500",
              },
              {
                id: 3,
                name: "Veg Chowmein",
                price: 60,
                imageUri: "https://picsum.photos/500",
              },
              {
                id: 4,
                name: "Chicken Chowmein",
                price: 80,
                imageUri: "https://picsum.photos/500",
              },
              {
                id: 5,
                name: "Chicken Khaja Set with Chicken curry and Vatmas Sadeko",
                price: 150,
                imageUri: "https://picsum.photos/500",
              },
            ]}
            renderItem={renderFlatList}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.redDots} />
        </View>
      )}
    </BlackGradientView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp(5),
  },
  image: {
    height: hp(20),
    width: "100%",
    borderRadius: nf(4),
  },
  text3: {
    color: Colors.darkBlack,
    fontSize: nf(21),
    fontFamily: Fonts.bold,
  },
  text2: {
    color: Colors.darkBlack,
    fontSize: nf(18),
    fontFamily: Fonts.bold,
  },
  text1: {
    color: Colors.darkBlack,
    fontSize: nf(16),
    fontFamily: Fonts.medium,
  },
});
