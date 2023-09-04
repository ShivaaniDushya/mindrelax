import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import loadingIcon from "../../assets/image/voice/loading.gif";
import recordIcon from "../../assets/image/voice/recordingIcon.png";
import voiceLoadingIcon from "../../assets/image/voice/voiceLoading.gif";
import { Audio } from "expo-av";

const VoiceEmotionScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [userInfo, setUserInfo] = useState({});

  const convertToJSON = (obj) => {
    try {
      setUserInfo(obj);
    } catch (e) {
      setUserInfo(obj);
    }
  };

  useEffect(() => {
    convertToJSON(user);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <TouchableOpacity disabled>
          <Ionicons name="menu" size={30} color={colors.muted} />
        </TouchableOpacity>
        <View style={styles.topbarlogoContainer}>
          <Image source={easybuylogo} style={styles.logo} />
          <Text style={styles.toBarText}>MindFulness</Text>
        </View>
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate("UserProfile", { user: user })}
        >
          <Ionicons name="person-circle-sharp" size={30} color={colors.muted} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
       
      </View>
    </View>
  );
};

export default VoiceEmotionScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  topbarlogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
  },
  bodyContainer: {
    width: "100%",
    flexDirecion: "row",

    paddingBottom: 0,
    flex: 1,
  },
  logo: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  cartIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
