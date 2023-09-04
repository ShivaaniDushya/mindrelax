import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import easybuylogo from "../../assets/logo/logo.png";
import { colors } from "../../constants";
import { SliderBox } from "react-native-image-slider-box";

const slides = [require("../../assets/image/banners/banner.png")];

const HomeScreen = ({ navigation, route }) => {
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
          onPress={() => navigation.navigate("UserProfile", { user: user })}>
          <Ionicons name="person-circle-sharp" size={30} color={colors.muted} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.promotiomSliderContainer}>
            <SliderBox
              images={slides}
              sliderBoxHeight={140}
              dotColor={colors.primary}
              inactiveDotColor={colors.muted}
              paginationBoxVerticalPadding={10}
              autoplayInterval={6000}
            />
          </View>

          <View style={styles.primaryTextContainer}>
            <Text style={styles.primaryText}>Home</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

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
  primaryTextContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  primaryText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  promotiomSliderContainer: {
    margin: 5,
    height: 140,
    backgroundColor: colors.light,
  },
  cartIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
