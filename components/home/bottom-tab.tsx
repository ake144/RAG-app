import { Pressable, Text, View } from "react-native";

const TABS = [
  { label: "Home", icon: "🏠", active: true },
  { label: "Sermons", icon: "▶" },
  { label: "Events", icon: "📅" },
  { label: "Give", icon: "❤" },
  { label: "More", icon: "⋯" },
];

export default function BottomTab() {
  return (
    <View className="flex-row items-center justify-between border-t border-slate-200 bg-white px-6 py-3">
      {TABS.map((tab) => (
        <Pressable key={tab.label} className="items-center">
          <Text className={tab.active ? "text-blue-600" : "text-slate-400"}>
            {tab.icon}
          </Text>
          <Text
            className={
              tab.active
                ? "text-xs font-semibold text-blue-600"
                : "text-xs text-slate-400"
            }
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
