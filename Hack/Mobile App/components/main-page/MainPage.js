import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SymptomPage from "../symptom-page/SymptomPage.js";
import UserSymptomPage from "../symptom-page/UserSymptomPage.js";
import DataAnalytics from "../public-data-page/DataAnalytics.js";
import MapService from "../map-service/MapService.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createMaterialBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function MyTabs({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Data Analytics"
        component={DataAnalytics}
        options={{
          tabBarLabel: "Data Analytics",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="google-analytics"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Symptom Tracker"
        component={MapService}
        options={{
          tabBarLabel: "Symptom Tracker",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="My Symptoms"
        component={UserSymptomPage}
        options={{
          tabBarLabel: "My Symptoms",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Data Analytics":
      return "Data Analytics";
    case "Symptom Tracker":
      return "Symptom Tracker";
    case "My Symptoms":
      return "My Symptoms";
  }
}
