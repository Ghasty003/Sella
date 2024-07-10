import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screens/SplashScreen";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/Home";
import Account from "./src/screens/Account";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "./src/config/colors";
import CreateButton from "./src/components/CreateButton";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => {
            let iconName;

            switch (route.name) {
              case "Home":
                iconName = focused ? "home" : "home-outline";
                break;
              case "Account":
                iconName = focused ? "person" : "person-outline";
                break;
              default:
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
      <CreateButton />
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Hometab" component={HomeTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
