import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CalendarScreen, CalendarFullScreen, CalendarFilters, CalendarResult } from '../screens';

const CalendarStack = createStackNavigator();

const CalendarStackNavigator = () => {
  return (
    <CalendarStack.Navigator initialRouteName="CalendarScreen">
      <CalendarStack.Group
        screenOptions={{
          headerShown: true,
        }}>
        <CalendarStack.Screen
          name="CalendarScreen"
          component={CalendarScreen}
        />
        <CalendarStack.Screen
          name="CalendarFullScreen"
          component={CalendarFullScreen}
        />
        <CalendarStack.Screen
          name="CalendarFilters"
          component={CalendarFilters}
        />
        <CalendarStack.Screen
          name="CalendarResult"
          component={CalendarResult}
        />
      </CalendarStack.Group>
    </CalendarStack.Navigator>
  );
};

export default CalendarStackNavigator;
