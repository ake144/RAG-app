import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function SettingScreen() {
    return (
      <View className="flex-1 items-center justify-center bg-slate-100">
          <Text className="text-lg font-bold text-slate-800">Settings</Text>

          <Link href="/faq" asChild>
              <TouchableOpacity className="mt-8 bg-blue-500 px-6 py-3 rounded-full">
                  <Text className="text-white font-semibold">Help & FAQ</Text>
              </TouchableOpacity>
          </Link>
      </View>
    );
}
