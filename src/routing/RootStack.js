import React, { useEffect, useState } from "react";
import {
  View,
  Platform,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { navigationRef } from "./NavigationService";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { MainTeamsScreen, TeamDetailsScreen } from "../components/Teams";
import { MainJoinScreen } from "../components/Join";
import { MainProfileScreen } from "../components/Profile";
import { FooterScreen } from "../components/Dashboard";
import { IntroScreen } from "../components/IntroScreen";
import MenuScreen from "../components/Join/MenuScreen";
import { Colors, Icons, Fonts, wp, hp, nf } from "../constants/constants";
import {
  ConfirmEligibility,
  TwitchIntegrationScreen,
  TwitchSuccess,
  SelectGamesScreen,
  EnterYourIdName,
  PaypalSignIn,
  PaypalSuccess,
  ConfirmInformation,
} from "../components/AuthScreen";
import {
  NotificationScreen,
  SettingsScreen,
  MainProfileScreenOthers,
} from "../components/Profile";
import { StartScreen } from "../components/IntroScreen";
import { types } from "../store/ActionTypes";
import CartScreen from "../components/common/CartScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const AuthStack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="MainJoinScreen" component={MainJoinScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="TeamDetailsScreen" component={TeamDetailsScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen
        name="MainProfileScreenOthers"
        component={MainProfileScreenOthers}
      />
    </Stack.Navigator>
  );
}

function OrderStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
      initialRouteName="My Orders"
    >
      <Stack.Screen name="MainTeamsScreen" component={MainTeamsScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
      initialRouteName="Profile"
    >
      <Stack.Screen name="MainProfileScreen" component={MainProfileScreen} />
    </Stack.Navigator>
  );
}

export default RootStack = () => {
  const { renderAgainStack, userDataUrl } = useSelector(
    (state) => ({
      renderAgainStack: state.globalReducer.renderAgainStack,
      userDataUrl: state.authReducer.userDataUrl,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const [screenType, setscreenType] = useState(0);
  const [startScreen, setstartScreen] = useState(true);

  const getData = async () => {
    let user_data = await AsyncStorage.getItem("user_data");
    console.log("user_data", user_data);
    if (user_data) {
      dispatch({
        type: types.UPDATE_USER_DATA,
        payload: user_data,
      });
      setscreenType(1);
    } else {
      setscreenType(1);
    }
    setstartScreen(false);
  };

  useEffect(() => {
    setstartScreen(true);
    setTimeout(() => {
      getData();
    }, 2000);
  }, [renderAgainStack]);

  if (startScreen) {
    return <StartScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {screenType == 1 ? (
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
          tabBarOptions={{
            activeTintColor: Colors.orange,
          }}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="OrderStack"
            component={OrderStack}
            options={{
              tabBarLabel: "My Orders",
              tabBarIcon: ({ color, size }) => (
                <Icon name="history" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="ProfileStack"
            component={ProfileStack}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color, size }) => (
                <Icon name="user" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <AuthStack.Navigator
          screenOptions={{
            gestureEnabled: false,
            headerShown: false,
          }}
          initialRouteName={"IntroScreen"}
        >
          <AuthStack.Screen name="IntroScreen" component={IntroScreen} />
          <AuthStack.Screen
            name="ConfirmEligibility"
            component={ConfirmEligibility}
          />
          <AuthStack.Screen
            name="TwitchIntegrationScreen"
            component={TwitchIntegrationScreen}
          />
          <AuthStack.Screen name="TwitchSuccess" component={TwitchSuccess} />
          <AuthStack.Screen
            name="SelectGamesScreen"
            component={SelectGamesScreen}
          />
          <AuthStack.Screen
            name="EnterYourIdName"
            component={EnterYourIdName}
          />
          <AuthStack.Screen name="PaypalSignIn" component={PaypalSignIn} />
          <AuthStack.Screen name="PaypalSuccess" component={PaypalSuccess} />
          <AuthStack.Screen
            name="ConfirmInformation"
            component={ConfirmInformation}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};
