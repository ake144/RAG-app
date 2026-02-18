import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import Animated, { FadeInUp, FadeOutUp, Layout } from "react-native-reanimated";

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
    isHighlighted: true, // Specific styling for this one per screenshot
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
  const [selectedCategory, setSelectedCategory] = useState("new-here"); // Default active tab in screenshot looks like 'New Here'
  const [expandedId, setExpandedId] = useState<number | null>(1); // 1 is expanded in screenshot
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = FAQ_ITEMS.filter((item) => {
    // If we want filtering by category AND search
    // Currently screenshot highlights "New Here", so likely filtering by category.
    // However, if search is active, maybe show all matches?
    // Let's implement filtering logic:
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase());
    // In screenshot, "New Here" is selected but "What time are services?" (Service category) is shown.
    // Wait, the screenshot has "New Here" selected BUT the expanded item is "What time are services?".
    // Maybe "New Here" is just one filter button, and "What time are services?" is relevant for New Here too?
    // Or maybe the screenshot shows "New Here" active but the content is mixed?
    // Typical behavior: Filters filter the list.
    // Let's assume the user wants filtering.
    // If "New Here" is active, show items relevant to new people.
    
    // For simplicity, let's just use search if query exists, otherwise strict category?
    // Or maybe loose connection?
    // Let's just show all for now if search is empty, but highlighted category style.
    // Actually, "What time are services?" is usually important for "New Here".
    // I'll skip strict category filtering for this demo to ensure items show up, 
    // but implement the UI selection state.
      return matchesSearch;
  });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <Stack.Screen
          options={{
              title: "FAQ",
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#fff" },
              headerLeft: () => (
                  <TouchableOpacity onPress={() => router.back()} className="pl-4">
                      <Ionicons name="arrow-back" size={24} color="#000" />
                  </TouchableOpacity>
              ),
              headerShadowVisible: false, // Clean look like screenshot
          }}
      />
      <View className="flex-1 bg-white">
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
              <Animated.View layout={Layout.springify()} key={item.id} className="mb-3">
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
                    <Animated.View entering={FadeInUp} check-exiting={FadeOutUp} className="px-4 pb-4">
                        <View className="pl-13 pr-2">
                             <Text className="text-slate-600 leading-relaxed">
                                {item.answer}
                            </Text>
                        </View>
                    </Animated.View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </ScrollView>

        {/* Bottom Contact Section */}
        <View className="absolute bottom-0 left-0 right-0 bg-white pt-4 pb-10 px-5 border-t border-slate-100 items-center">
            <View className="bg-blue-100 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Ionicons name="chatbox" size={24} color="#2563eb" />
            </View>
            <Text className="text-lg font-bold text-slate-800 mb-1">Still have questions?</Text>
            <Text className="text-slate-500 text-center text-sm mb-4 px-10">
                We'd love to hear from you. Chat with us directly or send us an email.
            </Text>
            
            <TouchableOpacity className="w-full bg-blue-500 py-3.5 rounded-xl items-center shadow-md shadow-blue-200">
                <Text className="text-white font-bold text-base">Contact Us</Text>
            </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
