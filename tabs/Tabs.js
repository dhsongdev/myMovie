import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movie from '../screens/Movie';
import Search from '../screens/Search';
import Tv from '../screens/Tv';

//icons
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Movie"
        component={Movie}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="movie" color="grey" size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="live-tv" size={30} color="grey" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="search" color="grey" size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
