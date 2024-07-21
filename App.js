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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ItemDetailsBottomSheet from "./src/components/ItemDetailsBottomSheet";
import { useRef } from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import CreateItemBottomSheet from "./src/components/CreateItemBottomSheet";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AccountScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        component={Account}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeTab() {
  const ref = useRef(null);

  const handleOpen = () => {
    ref.current?.open();
  };

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
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
      <CreateButton handleOpen={handleOpen} />
      <ItemDetailsBottomSheet />
      <CreateItemBottomSheet ref={ref} />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
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
      </GestureHandlerRootView>
    </Provider>
  );
}
