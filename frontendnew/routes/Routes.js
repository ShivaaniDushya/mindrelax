import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/auth/Splash";
import Tabs from "./tabs/Tabs";
import VoiceEmotionScreen from "../screens/user/VoiceEmotionScreen";
import TextEmotionScreen from "../screens/user/TextEmotionScreen";
import FaceEmotionScreen from "../screens/user/FaceEmotionScreen";
import HeartStressScreen from "../screens/user/HeartStressScreen";
import UserProfileScreen from "../screens/profile/UserProfileScreen";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="tab" component={Tabs} />
        <Stack.Screen name="voiceemotion" component={VoiceEmotionScreen} />
        <Stack.Screen name="textemotion" component={TextEmotionScreen} />
        <Stack.Screen name="FaceEmotion" component={FaceEmotionScreen} />
        <Stack.Screen name="HeartStress" component={HeartStressScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
