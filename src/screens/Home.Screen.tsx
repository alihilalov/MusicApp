import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Avatar } from "../components/Avatar";
import { HHeader } from "../components/H.Header";
import RingVector from "../../assets/vectors/ring.svg";
import SearchVector from "../../assets/vectors/search.svg";
import { activeIndex, standardHitSlop } from "../theme/standart";
import { colors } from "../theme/colors";
import { Input } from "../components/Input";
import { Card, ICard } from "../components/Card";
import { songs } from "../mocks/songs.mock";
import { FlashList } from "@shopify/flash-list";
import { CommonStyles } from "../theme/common";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
  const [value, setValue] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<any>(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { navigate } = useNavigation<any>();

  const renderCards = ({ item, index }: { item: any; index: number }) => {
    return (
      <Card
        key={index}
        title={item.artist.name}
        url={item.artist.picture_medium}
        onPress={() =>
          onCardPress(
            item.title,
            item.artist.picture_big,
            item.name,
            item.duration
          )
        }
      />
    );
  };

  const renderVerticalCards = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    return (
      <Card
        size="s"
        key={index}
        horizontal
        singer={item.artist.name}
        title={item.album.title}
        description={item.type}
        url={item.artist.picture_big}
        onPress={() =>
          onCardPress(
            item.title,
            item.artist.picture_big,
            item.name,
            item.duration
          )
        }
      />
    );
  };

  const fetchSongs = async () => {
    const response: Response = await fetch(
      "https://api.deezer.com/radio/37151/tracks"
    );
    const result = await response.json();

    setData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const navigation = useNavigation<any>();
  const onCardPress = (
    title: string,
    url: string,
    singer: string,
    duration: number
  ) => {
    navigation.navigate("Music", { title, url, singer, duration });
  };

  return (
    <ScrollView
      indicatorStyle="white"
      style={styles.scrollView}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.root}>
        <HHeader
          left={
            <Avatar
              title="Ali Hilalov"
              caption="Gold Member"
              url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKrcOlBa02tY4eOaKHFMvOTS4b4M9g6Qxy6isekBWnXQ&s"
            />
          }
          right={
            <TouchableOpacity
              activeOpacity={activeIndex}
              hitSlop={standardHitSlop}
              onPress={() => console.log("pressed")}
            >
              <RingVector color={colors.gray} />
            </TouchableOpacity>
          }
        />

        <View style={styles.search}>
          <Text numberOfLines={2} style={styles.title}>
            Listen The Latest Music
          </Text>
          <Input
            placeholder="Search Music"
            placeholderTextColor={colors.gray}
            inputStyle={{ flexGrow: 0 }}
            value={value}
            icon={<SearchVector color={colors.lightGray} />}
            setValue={setValue}
          />
        </View>
        <View style={[CommonStyles.flex, { gap: 16 }]}>
          {loading ? (
            <Text style={[styles.title, styles.cardHeader]}>Loading...</Text>
          ) : (
            <Text numberOfLines={2} style={[styles.title, styles.cardHeader]}>
              Recently Played
            </Text>
          )}
          {data ? (
            <FlashList
              data={data}
              horizontal
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={50}
              ItemSeparatorComponent={() => <View style={{ width: 17 }} />}
              renderItem={renderCards}
            />
          ) : null}
        </View>

        <Text numberOfLines={2} style={[styles.title, styles.cardHeader]}>
          Recently Played
        </Text>
        <FlashList
          data={data}
          removeClippedSubviews
          contentContainerStyle={styles.cards}
          scrollEnabled={false}
          estimatedItemSize={50}
          ItemSeparatorComponent={() => <View style={{ height: 17 }} />}
          renderItem={renderVerticalCards}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,

    flex: 1,
    minHeight: "100%",
    backgroundColor: colors.dark,
  },
  scrollView: {
    flex: 1,
  },
  search: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 26,
    width: "50%",
    color: colors.white,
  },
  cards: {
    paddingTop: 18,
    // gap: 17,
  },
  cardHeader: {
    width: undefined,
    fontSize: 22,
    marginTop: 44,
  },
});
