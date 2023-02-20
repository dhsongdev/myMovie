import React from 'react';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movie from '../screens/Movie';
import Search from '../screens/Search';
import Tv from '../screens/Tv';

//color
import { lightMode, darkMode } from '../themeColors';

//icons
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const colorScheme = useColorScheme();

  const themeColor = {
    icon:
      colorScheme === 'dark' ? darkMode.mainTextColor : lightMode.mainTextColor,
    text:
      colorScheme === 'dark' ? darkMode.mainTextColor : lightMode.mainTextColor,
    tabBackground: colorScheme === 'dark' ? darkMode.mainBG : lightMode.mainBG,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColor.tabBackground,
        },
        headerTitleStyle: { color: themeColor.text },
        tabBarStyle: {
          backgroundColor: themeColor.tabBackground,
          color: themeColor.text,
        },
        tabBarActiveTintColor: '#C92C6D',
        tabBarInactiveTintColor: themeColor.text,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Movie"
        component={Movie}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="movie" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="live-tv" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
