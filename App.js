import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {IntroductionScreen, WelcomeScreen} from './AppScreen/Stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen
          name="IntroductionScreen"
          component={IntroductionScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
