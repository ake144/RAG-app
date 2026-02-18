import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GiveScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 100 }}>
        <Stack.Screen options={{ title: 'Give', headerShadowVisible: false }} />
        <View className="items-center pt-10 px-6">
            <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
                <Ionicons name="heart" size={32} color="#2563eb" />
            </View>
            <Text className="text-2xl font-bold text-slate-800 mb-2">Give Online</Text>
            <Text className="text-slate-500 text-center mb-8">
                Your generosity helps us continue our mission to serve the community.
            </Text>

            <TouchableOpacity className="w-full bg-blue-600 py-4 rounded-xl items-center shadow-lg shadow-blue-200 mb-4">
                <Text className="text-white font-bold text-lg">Give Now</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-full bg-white border border-slate-200 py-4 rounded-xl items-center">
                <Text className="text-slate-700 font-bold text-lg">View Giving History</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}
