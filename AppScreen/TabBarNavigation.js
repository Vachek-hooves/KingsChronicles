import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FilterScreen from './Tab/FilterScreen';
import RoyalScreen from './Tab/RoyalScreen';
const Tab = createBottomTabNavigator();

const TabBarNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="FilterScreen" component={FilterScreen} />
    </Tab.Navigator>
  );
};

export default TabBarNavigation;

const styles = StyleSheet.create({});
