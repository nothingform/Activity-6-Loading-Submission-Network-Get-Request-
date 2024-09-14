import { SafeAreaView, StatusBar, View, StyleSheet, Text, FlatList, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async (limit = 10) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}!`
      );
      const data = await response.json();
      setPostList(data);
      setIsLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
 
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
         <ActivityIndicator size="large" color="0000ff" />
         <Text>Loading... </Text>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={postList}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.bodyText}>{item.body}</Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() => (
            <View style={{ height: 16 }} />
          )}
          ListEmptyComponent={<Text>No Post Found</Text>}
          ListHeaderComponent={<Text style={styles.headerText}>Post List</Text>}
          ListFooterComponent={<Text style={styles.footerText}>End of List</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
   padding: StatusBar.currentHeight || 0,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1, // Fixed typo here
    borderColor: "#ddd" // Added borderColor for visibility
  },
  titleText: { // Fixed typo here
    fontSize: 18,
    fontWeight: "bold", // Added to enhance title visibility
    marginBottom: 8
  },
  bodyText: {
    fontSize: 14,
    color: "#666666"
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12
  },
  footerText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 12
  },
  loadingContainer: {
    flex: 1,
    borderColor: "#f5f5f5",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center"
  },
});