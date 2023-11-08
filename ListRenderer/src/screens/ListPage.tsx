import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetUsersQuery } from "../store/usersApi";

const ListPage = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetUsersQuery(page);

  const keyExtractor = (item) => `${item.id}_${item.title}`;
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          gap: 16,
        }}
      >
        <Image
          source={{
            uri: "https://image.tmdb.org/t/p/w200/" + item.poster_path,
          }}
          style={{ height: 64, width: 64, borderRadius: 50 }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontWeight: "500", fontSize: 16 }}
            lineBreakMode="tail"
          >
            {item.original_title}
          </Text>
          <Text style={{ width: "auto" }}>{item.overview.slice(0, 100)}</Text>
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        refreshing={isFetching}
        data={data}
        extraData={data}
        keyExtractor={keyExtractor}
        onEndReached={onRefresh}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default ListPage;

const styles = StyleSheet.create({});
