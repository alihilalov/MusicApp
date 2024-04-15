import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { HomeScreen } from "./src/screens/Home.Screen";
import { colors } from "./src/theme/colors";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MusicScreen } from "./src/screens/Music.Screen";
import { FavoriteScreen } from "./src/screens/Favorite.Screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeVector from "./assets/vectors/home.svg";
import MusicVector from "./assets/vectors/music.svg";
import LikedScreenVector from "./assets/vectors/likedScreen.svg";
import { windowWidth } from "./src/theme/consts.styles";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"), // 400
    "Nunito-SemiBold": require("./assets/fonts/Nunito-SemiBold.ttf"), // 600
  });

  const onLayoutRootView = async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarActiveTintColor: colors.primary,
              tabBarStyle: styles.tab,
            }}
          >
            <Tab.Screen
              options={{
                tabBarIcon: ({ focused }) => (
                  <HomeVector color={focused ? colors.primary : colors.gray} />
                ),
              }}
              name="Home"
              component={HomeScreen}
            />

            <Tab.Screen
              options={{
                tabBarIcon: ({ focused }) => (
                  <MusicVector color={focused ? colors.primary : colors.gray} />
                ),
              }}
              name="Music"
              component={MusicScreen}
            />
            <Tab.Screen
              options={{
                tabBarIcon: ({ focused }) => (
                  <LikedScreenVector
                    color={focused ? colors.primary : colors.gray}
                  />
                ),
              }}
              name="Favorite"
              component={FavoriteScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
  },
  safe: {
    flex: 1,
  },
  tab: {
    backgroundColor: colors.dark,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.gray,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: windowWidth,
    height: 85,
  },
});
