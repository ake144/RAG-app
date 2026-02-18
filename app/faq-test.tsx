import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function FAQTestScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "FAQ Test" }} />
      <Text>FAQ Test Screen</Text>
    </View>
  );
}
