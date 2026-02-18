import { View, Text } from "react-native";

export default function MapCard() {
  return (
    <View className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
      <Text className="text-lg font-semibold text-slate-900">Find Us</Text>
      <Text className="mt-1 text-sm text-slate-500">
        420 Market Street, San Francisco, CA
      </Text>

      <View className="mt-4 h-40 rounded-2xl bg-sky-100 items-center justify-center">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
          <Text className="text-xl">📍</Text>
        </View>
        <Text className="mt-3 text-sm font-semibold text-slate-700">
          Downtown Campus
        </Text>
      </View>

      <View className="mt-4 flex-row items-center justify-between">
        <View>
          <Text className="text-sm text-slate-500">Service Office</Text>
          <Text className="text-base font-semibold text-slate-900">
            (415) 555-0134
          </Text>
        </View>
        <View className="rounded-full bg-blue-50 px-4 py-2">
          <Text className="text-xs font-semibold text-blue-700">Get Directions</Text>
        </View>
      </View>
    </View>
  );
}
