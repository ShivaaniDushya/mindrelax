import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons , MaterialIcons, FontAwesome} from "@expo/vector-icons";
import HomeScreen from "../../screens/user/HomeScreen";
import { colors } from "../../constants";
import UserProfileScreen from "../../screens/profile/UserProfileScreen";
import VoiceEmotionScreen from "../../screens/user/VoiceEmotionScreen";
import TextEmotionScreen from "../../screens/user/TextEmotionScreen";
import FaceEmotionScreen from "../../screens/user/FaceEmotionScreen";
import HeartStressScreen from "../../screens/user/HeartStressScreen";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation, route }) => {
  const { user } = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,

        tabBarIcon: ({ focused }) => {
          let routename = route.name;
          if (routename == "home") {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <Ionicons
                  name="home"
                  size={29}
                  color={colors.primary}
                />
                ) : (
                  <Ionicons
                  name="home"
                  size={29}
                  color={colors.muted}
                />
                )}
              </TouchableOpacity>
            );
          } else if (routename == "textemotion") {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <Ionicons
                    name="ios-document-text-sharp"
                    size={29}
                    color={colors.primary}
                  />
                ) : (
                  <Ionicons
                    name="ios-document-text-sharp"
                    size={29}
                    color={colors.muted}
                  />
                )}
              </TouchableOpacity>
            );
          } else if (routename == "voiceemotion") {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <MaterialIcons
                    name="keyboard-voice"
                    size={29}
                    color={colors.primary}
                  />
                ) : (
                  <MaterialIcons
                    name="keyboard-voice"
                    size={29}
                    color={colors.muted}
                  />
                )}
              </TouchableOpacity>
            );
          } else if (routename == "faceemotion") {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <MaterialIcons
                    name="photo-library"
                    size={29}
                    color={colors.primary}
                  />
                ) : (
                  <MaterialIcons
                    name="photo-library"
                    size={29}
                    color={colors.muted}
                  />
                )}
              </TouchableOpacity>
            );
          } else if (routename == "heartstress") {
            return (
              <TouchableOpacity disabled>
              {focused == true ? (
                <FontAwesome
                  name="heartbeat"
                  size={29}
                  color={colors.primary}
                />
              ) : (
                <FontAwesome
                  name="heartbeat"
                  size={29}
                  color={colors.muted}
                />
              )}
            </TouchableOpacity>
            );
          }
        },
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.white,
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        initialParams={{ user: user }}
        tabBarOptions={{
          style: {
            position: "absolute",
          },
        }}
      />
      <Tab.Screen
        name="textemotion"
        component={TextEmotionScreen}
        initialParams={{ user: user }}
        tabBarOptions={{
          tabBarHideOnKeyboard: true,
          style: {
            position: "absolute",
          },
        }}
      />
      {
        <Tab.Screen
          name="voiceemotion"
          component={VoiceEmotionScreen}
          initialParams={{ user: user }}
        />
      }
      <Tab.Screen
        name="faceemotion"
        component={FaceEmotionScreen}
        initialParams={{ user: user }}
      />
      <Tab.Screen
        name="heartstress"
        component={HeartStressScreen}
        initialParams={{ user: user }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabIconStyle: {
    width: 10,
    height: 10,
  },
});
