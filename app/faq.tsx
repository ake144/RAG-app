import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
// import Animated, { FadeInUp, FadeOutUp, Layout } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// FAQ Data with categories
const FAQ_CATEGORIES = [
  { id: "new-here", label: "New Here" },
  { id: "kids", label: "Kids" },
  { id: "service", label: "Service" },
  { id: "giving", label: "Giving" },
  { id: "other", label: "Other" },
];

const FAQ_ITEMS = [
  {
    id: 1,
    question: "What time are services?",
    answer: "We have services every Sunday at 9:00 AM and 11:00 AM. Join us for coffee 30 minutes beforehand in the main lobby!",
    category: "service",
    iconName: "time-outline", // Ionicons
    isHighlighted: true, 
  },
  {
    id: 2,
    question: "What should I wear?",
    answer: "We're casual here! Feel free to wear whatever makes you comfortable.",
    category: "new-here",
    iconName: "shirt-outline",
  },
  {
    id: 3,
    question: "Is there childcare?",
    answer: "Yes! We have full childcare available during all services for ages 0-12.",
    category: "kids",
    iconName: "happy-outline",
  },
  {
    id: 4,
    question: "How can I volunteer?",
    answer: "Visit the connection desk in the lobby or sign up on our website under 'Serve'.",
    category: "service",
    iconName: "heart-outline",
  },
  {
    id: 5,
    question: "Where do I park?",
    answer: "We have a large parking lot on the north side, and overflow parking across the street.",
    category: "new-here",
    iconName: "location-outline",
  },
];

export default function FAQScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("new-here");
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = FAQ_ITEMS.filter((item) => {
      // Basic search filter
      if (!searchQuery) return true;
      return item.question.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View className="flex-1 bg-white" style={{ flex: 1 }}>
      <Stack.Screen
          options={{
              headerShown: true, // Ensure header is shown
              title: "FAQ",
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#fff" },
              headerLeft: () => (
                  <TouchableOpacity onPress={() => router.back()} className="pl-4">
                      <Ionicons name="arrow-back" size={24} color="#000" />
                  </TouchableOpacity>
              ),
              headerShadowVisible: false,
              contentStyle: { backgroundColor: "#fff" }, // Ensure white background
          }}
      />
      <View 
        className="flex-1 bg-white" 
        style={{ paddingBottom: insets.bottom }} // Handle bottom safe area
      >
        {/* Search Bar */}
        <View className="px-5 pt-2 pb-4">
          <View className="flex-row items-center bg-slate-100 rounded-full px-4 py-3 border border-slate-200">
            <Ionicons name="search" size={20} color="#94a3b8" />
            <TextInput
              placeholder="Search questions..."
              className="flex-1 ml-2 text-base text-slate-700 font-medium"
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Filter Chips */}
        <View className="pb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
            {FAQ_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full border ${
                  selectedCategory === cat.id
                    ? "bg-blue-500 border-blue-500"
                    : "bg-white border-slate-200"
                }`}
              >
                <Text
                  className={`font-semibold ${
                    selectedCategory === cat.id ? "text-white" : "text-slate-700"
                  }`}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* FAQ List */}
        <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 100 }}>
          {filteredFAQs.map((item) => {
            const isExpanded = expandedId === item.id;
            
            return (
              <View key={item.id} className="mb-3">
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => toggleExpand(item.id)}
                  className={`bg-white border rounded-2xl overflow-hidden ${
                    isExpanded ? "border-slate-200 shadow-sm" : "border-slate-200"
                  }`}
                >
                  <View className="flex-row items-center p-4">
                    <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${isExpanded ? 'bg-blue-100' : 'bg-slate-100'}`}>
                        <Ionicons 
                            name={item.iconName as any} 
                            size={20} 
                            color={isExpanded ? "#2563eb" : "#64748b"} 
                        />
                    </View>
                    <Text className="flex-1 text-base font-semibold text-slate-800">
                      {item.question}
                    </Text>
                    <Ionicons 
                        name={isExpanded ? "chevron-up" : "chevron-down"} 
                        size={20} 
                        color="#64748b" 
                    />
                  </View>
                  
                  {isExpanded && (
                    <View className="px-4 pb-4">
                        <View className="pl-13 pr-2">
                             <Text className="text-slate-600 leading-relaxed">
                                {item.answer}
                            </Text>
                        </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
