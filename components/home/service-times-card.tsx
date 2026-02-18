import { View, Text } from "react-native";
import PrimaryButton from "../ui/button";

const SERVICES = [
  {
    title: "Morning Worship",
    location: "Main Sanctuary",
    time: "9:00 AM",
  },
  {
    title: "Second Service",
    location: "Main Sanctuary & Online",
    time: "11:00 AM",
  },
];

export default function ServiceTimesCard() {
  return (
    <View className="-mt-16 rounded-3xl bg-white px-5 py-6 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <Text className="text-lg">🕒</Text>
          </View>
          <View>
            <Text className="text-lg font-semibold text-slate-900">
              Service Times
            </Text>
            <Text className="text-sm text-slate-500">
              Join us this Sunday
            </Text>
          </View>
        </View>
        <View className="rounded-full bg-emerald-50 px-3 py-1">
          <Text className="text-xs font-semibold text-emerald-700">
            OPEN NOW
          </Text>
        </View>
      </View>

      <View className="mt-5 gap-3">
        {SERVICES.map((service) => (
          <View
            key={service.title}
            className="flex-row items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"
          >
            <View>
              <Text className="text-base font-semibold text-slate-900">
                {service.title}
              </Text>
              <Text className="text-sm text-slate-500">
                {service.location}
              </Text>
            </View>
            <Text className="text-base font-semibold text-blue-600">
              {service.time}
            </Text>
          </View>
        ))}
      </View>

      <View className="mt-5">
        <PrimaryButton label="Watch Online" icon="▶" />
      </View>
    </View>
  );
}
