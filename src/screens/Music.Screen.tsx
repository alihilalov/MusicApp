import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { HHeader } from "../components/H.Header";
import LikeVector from "../../assets/vectors/like.svg";
import BackVector from "../../assets/vectors/back.svg";
import ShuffleVector from "../../assets/vectors/shuffle.svg";
import PauseVector from "../../assets/vectors/pause.svg";
import RepeatVector from "../../assets/vectors/repeat.svg";
import SkipBackVector from "../../assets/vectors/skip_back.svg";
import SkipForwardVector from "../../assets/vectors/skip_forward.svg";
import { colors } from "../theme/colors";
import { ProgressBar } from "../components/ProgressBar";
import { useNavigation, useRoute } from "@react-navigation/native";

const HeaderLeft = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Pressable onPress={handleGoBack}>
      <BackVector color={colors.white} />
    </Pressable>
  );
};

export const MusicScreen: React.FC = () => {
  const route = useRoute();
  const {
    title,
    url,
    singer,
    duration,
  }: { title: string; url: string; singer: string; duration: number } =
    route.params as any;

  const audioPlayer = useRef<null>(null);
  const [play, setPlay] = useState<boolean>(false);

  const onController = () => {
    // Toggle play state and perform necessary audio actions
    setPlay((state) => !state);
  };

  const HeaderRight = () => {
    const navigation = useNavigation<any>();

    const handleRightPress = () => {
      navigation.navigate("Favorite");
    };

    return (
      <Pressable onPress={handleRightPress}>
        <LikeVector color={colors.gray} />
      </Pressable>
    );
  };

  return (
    <View style={styles.root}>
      <HHeader
        left={<HeaderLeft />}
        right={<HeaderRight />}
        title="Ophelia by Steven"
      />
      <View style={styles.main}>
        <View style={styles.wrapper}>
          <Image
            resizeMode="cover"
            source={{
              uri: url,
            }}
            style={styles.image}
          />
          <View style={styles.imageTexts}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.singer}>{singer}</Text>
          </View>
          <View style={styles.controllers}>
            <ProgressBar time={duration} currentTime={120} />
            <View style={styles.buttons}>
              <ShuffleVector color={colors.white} />
              <SkipBackVector color={colors.white} />
              <Pressable onPress={onController} style={styles.pause}>
                {play ? <PauseVector color={colors.white} /> : <LikeVector />}
              </Pressable>
              <SkipForwardVector color={colors.white} />
              <RepeatVector color={colors.white} />
            </View>
          </View>
          <View
            style={{
              height: 81,
              width: "100%",
              backgroundColor: "grey",
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 17,
    gap: 32,
    backgroundColor: colors.dark,
  },
  pause: {
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 99,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {
    flex: 1,
  },
  wrapper: {
    gap: 28,
    flex: 1,
  },
  controllers: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  image: {
    height: 319,
    width: "100%",
    borderRadius: 36,
  },
  imageTexts: {
    gap: 7,
  },
  title: {
    fontFamily: "Nunito-Regular",
    fontSize: 24,
    color: colors.white,
    textAlign: "center",
  },
  singer: {
    fontFamily: "Nunito-Regular",
    fontSize: 18,
    color: colors.gray,
    textAlign: "center",
  },
});
