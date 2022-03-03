import React, { createRef, useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import RBSheet from "react-native-raw-bottom-sheet";
import { BlackGradientView, SquareCard } from ".";
import { Colors, Icons, Fonts, wp, hp, nf } from "../../constants/constants";
import { types } from "../../store/ActionTypes";
import { useDispatch } from "react-redux";

navigator.geolocation = require("@react-native-community/geolocation");

export default function CartScreen({ navigation, route }) {
  let { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const latitudeDelta = 0.005; //Very high zoom level
  const longitudeDelta = latitudeDelta * ASPECT_RATIO;
  const [cart, setCart] = useState(null);
  const [deliverCharge, setDeliverCharge] = useState(20);
  const [location, setLocation] = useState(null);
  const [state, setState] = useState({
    initialRegion: {
      latitude: 26.780701,
      longitude: 86.640955,
      latitudeDelta,
      longitudeDelta,
    },
    marginBottom: 1,
    listViewDisplayed: true,
    address: "",
    selectedAddress: "",
    showAddress: false,
    search: "",
    currentLat: "",
    currentLng: "",
    forceRefresh: 0,
    showCurrentLocation: false,
    locationDetails: {},
  });

  const dispatch = useDispatch();

  useEffect(() => {
    Geocoder.init("AIzaSyCG1JYXoF4jotxvjl1icq8mt7CVh5bIu4A");
  }, []);

  useEffect(() => {
    Geocoder.from({
      latitude: state.initialRegion?.latitude,
      longitude: state.initialRegion?.longitude,
    })
      .then((json) => {
        var cityName = json.results[0].address_components[1]?.short_name;
        var addressName = json.results[0].address_components[0]?.long_name;
        console.log(json.results[0].address_components);

        setState((prevState) => ({
          ...prevState,
          selectedAddress: `${cityName}, ${addressName}`,
          locationDetails: json.results[0],
        }));
      })
      .catch((error) => console.warn(error));
  }, [state.initialRegion.latitude, state.initialRegion.longitude]);

  const sheetRef = createRef();
  const mapView = createRef();

  useEffect(() => {
    setCart(route.params);
  }, [route]);
  const renderFlatList = ({ item, index }) => {
    return <SquareCard item={item} isCart removeItem={removeItem} />;
  };

  const removeItem = (item) => {
    Alert.alert("CONFIRMATION", "This item will be remove from your cart.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          let newCart = (cart || []).filter((c) => c.id !== item.id);
          setCart(newCart);
          dispatch({
            type: types.CART_ITEMS,
            payload: newCart,
          });
        },
        style: "default",
      },
    ]);
  };

  console.log("cart item", cart);

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, current) => accumulator + current.price,
      0
    );
  };

  const getAllTotalPrice = () => {
    if (getTotalPrice() >= 300) {
      return getTotalPrice();
    } else {
      return getTotalPrice() + deliverCharge;
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This App needs to access your location",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
        } else {
          Alert.alert("Permisson Denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        setState((prevState) => ({
          ...prevState,
          initialRegion: {
            latitude: Number(currentLatitude, 10),
            longitude: Number(currentLongitude, 10),
            latitudeDelta,
            longitudeDelta,
          },
        }));

        mapView.current.animateToRegion(state.initialRegion, 2000);

        console.log("init", this.state.initialRegion);
      },
      (error) => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
      }
    );
  };

  const onChangeValue = (initialRegion) => {
    setState((prevState) => ({
      ...prevState,
      initialRegion,
    }));
  };

  const goToInitialLocation = (region) => {
    let initialRegion = Object.assign({}, region);
    initialRegion.latitudeDelta = latitudeDelta;
    initialRegion.longitudeDelta = longitudeDelta;
    mapView.current.animateToRegion(initialRegion, 2000);
  };

  return (
    <BlackGradientView showBack>
      {!cart && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.redDots} />
        </View>
      )}
      {cart && cart.length === 0 && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image source={Icons.empty_cart} resizeMode="contain" />
          <Text
            style={{
              fontSize: nf(18),
              color: Colors.grey,
              fontFamily: Fonts.bold,
              marginTop: hp(3),
              marginHorizontal: wp(5),
            }}
          >
            Your cart is empty.
          </Text>
        </View>
      )}
      {cart && cart.length > 0 && (
        <>
          <RBSheet
            ref={sheetRef}
            onClose={() => {
              setSelectedItem(null);
              setSelectedQuantity(1);
            }}
            height={hp(90)}
          >
            <View>
              <View>
                <MapView
                  ref={mapView}
                  onMapReady={() => goToInitialLocation(state.initialRegion)}
                  style={{
                    height: hp(70),
                    marginBottom: 1,
                  }}
                  provider={PROVIDER_GOOGLE}
                  onRegionChangeComplete={onChangeValue}
                />
                <View
                  style={{
                    justifyContent: "center",
                    position: "absolute",
                    top: hp(35),
                    alignSelf: "center",
                  }}
                >
                  <Image
                    source={Icons.locationPointer}
                    resizeMode="contain"
                    style={{ width: wp(8), height: hp(6) }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  minHeight: hp(15),
                  flex: 1,
                  marginHorizontal: wp(8),
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    console.log("state", state);
                    setLocation(state.selectedAddress);
                    sheetRef.current.close();
                  }}
                  style={{
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "75%",
                    borderRadius: 15,
                    overflow: "hidden",
                    backgroundColor: Colors.orange,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: nf(18),
                      fontFamily: Fonts.bold,
                    }}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={requestLocationPermission}
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  <Icon name="gps-fixed" size={35} color={Colors.grey} />
                </TouchableOpacity>
              </View>
            </View>
          </RBSheet>
          <ScrollView style={styles.container}>
            <View style={{ flex: 1, marginHorizontal: wp(5) }}>
              <Text style={styles.text3}>CART</Text>
              <View style={{ marginTop: hp(3), minHeight: hp(40) }}>
                <FlatList
                  ItemSeparatorComponent={() => (
                    <View style={{ height: hp(2) }} />
                  )}
                  data={cart}
                  renderItem={renderFlatList}
                  keyExtractor={(item) => item.id}
                />
              </View>
              <View
                style={{
                  height: 1,
                  marginTop: hp(2),
                  marginBottom: hp(1),
                  width: "100%",
                  backgroundColor: "#05ffb0",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: hp(2),
                }}
              >
                <Text
                  style={[
                    styles.text2,
                    {
                      fontSize: nf(14),
                      fontFamily: Fonts.medium,
                      color: Colors.darkBlack,
                    },
                  ]}
                >
                  Delivery to
                </Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => {
                    requestLocationPermission();
                    sheetRef.current.open();
                  }}
                >
                  {location ? (
                    <Text style={{ fontSize: nf(12), color: Colors.darkBlack }}>
                      {location}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: nf(14),
                        color: Colors.grey,
                        textAlign: "center",
                      }}
                    >
                      Click to Add
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: hp(2),
                }}
              >
                <Text
                  style={[
                    styles.text2,
                    {
                      fontSize: nf(14),
                      fontFamily: Fonts.medium,
                      color: Colors.darkBlack,
                    },
                  ]}
                >
                  Payment
                </Text>
                <View style={{ marginLeft: "auto" }}>
                  <Text
                    style={{
                      fontSize: nf(14),
                      color: Colors.darkBlack,
                      fontFamily: Fonts.medium,
                    }}
                  >
                    Cash on Delivery
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: hp(1),
                }}
              >
                <Text
                  style={[
                    styles.text2,
                    { fontSize: nf(14), fontFamily: Fonts.medium },
                  ]}
                >
                  Subtotal
                </Text>
                <Text
                  style={[
                    styles.text2,
                    {
                      fontSize: nf(14),
                      marginLeft: "auto",
                      fontFamily: Fonts.medium,
                    },
                  ]}
                >
                  {getTotalPrice()} NPR
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: hp(1),
                }}
              >
                <Text
                  style={[
                    styles.text2,
                    { fontSize: nf(14), fontFamily: Fonts.medium },
                  ]}
                >
                  Delivery
                </Text>
                {getTotalPrice() === getAllTotalPrice() ? (
                  <Text
                    style={[
                      styles.text2,
                      {
                        fontSize: nf(14),
                        marginLeft: "auto",
                        fontFamily: Fonts.medium,
                      },
                    ]}
                  >
                    0 NPR
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.text2,
                      {
                        fontSize: nf(14),
                        marginLeft: "auto",
                        fontFamily: Fonts.medium,
                      },
                    ]}
                  >
                    {deliverCharge} NPR
                  </Text>
                )}
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[styles.text2]}>Total</Text>
                <Text style={[styles.text2, { marginLeft: "auto" }]}>
                  {getAllTotalPrice()} NPR
                </Text>
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  Alert.alert(
                    "CONFIRMATION",
                    "Are you sure you want to order?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () =>
                          Alert.alert(
                            "ORDER PLACED",
                            "Thank you for ordering through us. Enjoy your meal.",
                            [
                              {
                                text: "OK",
                                onPress: () => {
                                  dispatch({
                                    type: types.CART_ITEMS,
                                    payload: [],
                                  });
                                  navigation.navigate("MainTeamsScreen");
                                },
                                style: "default",
                              },
                            ]
                          ),
                        style: "default",
                      },
                    ]
                  );
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: nf(18),
                    fontFamily: Fonts.bold,
                  }}
                >
                  Place Order
                </Text>
                <Icon
                  name="chevron-right"
                  color={Colors.white}
                  size={30}
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
    </BlackGradientView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: hp(100),
    marginVertical: hp(3),
  },
  buttonContainer: {
    marginTop: hp(4),
    marginBottom: hp(5),
    borderRadius: 4,
    flexDirection: "row",
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    alignItems: "center",
    backgroundColor: Colors.orange,
  },
  input: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginLeft: "auto",
    justifyContent: "center",
    minWidth: wp(50),
    height: hp(5),
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 4,
  },
  text3: {
    textAlign: "center",
    marginBottom: 8,
    color: Colors.darkBlack,
    fontSize: nf(21),
    fontFamily: Fonts.bold,
  },
  text2: {
    color: Colors.darkBlack,
    fontSize: nf(18),
    fontFamily: Fonts.bold,
  },
  basket: {},
});
