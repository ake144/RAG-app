import { View, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function FAQScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen options={{ title: "FAQ", presentation: "modal" }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>FAQ Screen</Text>
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
        <Text style={{ color: 'blue' }}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
