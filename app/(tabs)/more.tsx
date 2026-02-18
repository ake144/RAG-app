import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MENU_ITEMS = [
  { label: "New Here", icon: "hand-left-outline", route: "/faq" },
  { label: "Give", icon: "heart-outline", route: "/(tabs)/give" },
  { label: "Prayer Request", icon: "chatbox-ellipses-outline", route: "/faq" },
  { label: "FAQ", icon: "help-circle-outline", route: "/faq" },
  { label: "Contact Us", icon: "call-outline", route: "/faq" },
];

export default function MoreScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    
    return (
        <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 100 }}>
            <View className="px-6 mb-6 pt-4">
                 <Text className="text-2xl font-bold text-slate-900">More</Text>
            </View>
            
            <View className="bg-white mx-4 rounded-xl shadow-sm border border-slate-100 px-2">
                {MENU_ITEMS.map((item, index) => (
                    <Link href={item.route} key={item.label} asChild>
                        <TouchableOpacity 
                            className={`flex-row items-center py-4 px-3 ${index < MENU_ITEMS.length - 1 ? 'border-b border-slate-100' : ''}`}
                        >
                            <View className="w-8 items-center mr-3">
                                <Ionicons name={item.icon as any} size={22} color="#475569" />
                            </View>
                            <Text className="flex-1 text-base text-slate-700 font-medium">{item.label}</Text>
                            <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
            
            <View className="items-center mt-10">
                <Text className="text-slate-400 text-sm">Version 1.0.0</Text>
            </View>
        </ScrollView>
    );
}
