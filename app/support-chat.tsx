// Placeholder for a detailed help guide.
// You can explain:
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { generateRAGResponse } from "../lib/rag/api";

type Message = {
    id: string;
    text: string;
    isUser: boolean;
};

export default function SupportChatScreen() {
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "Hello! I'm your church guide. Ask me anything about our services, beliefs, or events.", isUser: false }
    ]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), text: inputText, isUser: true };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");
        setIsLoading(true);

        try {
            // Call our RAG service
            const answer = await generateRAGResponse(userMsg.text);
            const botMsg: Message = { id: (Date.now() + 1).toString(), text: answer, isUser: false };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            const errorMsg: Message = { id: (Date.now() + 1).toString(), text: "Sorry, I'm having trouble connecting right now.", isUser: false };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={{ flex: 1 }}
        >
            <Stack.Screen options={{ title: "Ask Us", headerTitleAlign: "center" }} />
            
            <View className="flex-1 bg-slate-50">
                <ScrollView 
                    ref={scrollViewRef}
                    className="flex-1 px-4 py-4"
                    contentContainerStyle={{ paddingBottom: 20 }}
                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                >
                    {messages.map((msg) => (
                        <View 
                            key={msg.id} 
                            className={`flex-row mb-4 ${msg.isUser ? "justify-end" : "justify-start"}`}
                        >
                            {!msg.isUser && (
                                <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center mr-2">
                                    <Ionicons name="chatbubble" size={16} color="#2563eb" />
                                </View>
                            )}
                            <View 
                                className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                                    msg.isUser 
                                        ? "bg-blue-600 rounded-br-none" 
                                        : "bg-white border border-slate-200 rounded-bl-none"
                                }`}
                            >
                                <Text className={`text-base ${msg.isUser ? "text-white" : "text-slate-800"}`}>
                                    {msg.text}
                                </Text>
                            </View>
                        </View>
                    ))}
                    {isLoading && (
                        <View className="flex-row items-center mb-4 ml-10">
                            <ActivityIndicator size="small" color="#94a3b8" />
                            <Text className="text-slate-400 ml-2 text-sm">Thinking...</Text>
                        </View>
                    )}
                </ScrollView>

                <View 
                    className="bg-white px-4 py-3 border-t border-slate-100 flex-row items-center"
                    style={{ paddingBottom: Math.max(insets.bottom, 12) }}
                >
                    <TextInput
                        className="flex-1 bg-slate-100 rounded-full px-4 py-3 mr-3 text-base text-slate-800"
                        placeholder="Type your question..."
                        placeholderTextColor="#94a3b8"
                        value={inputText}
                        onChangeText={setInputText}
                        onSubmitEditing={handleSend}
                    />
                    <TouchableOpacity 
                        onPress={handleSend}
                        disabled={isLoading || !inputText.trim()}
                        className={`w-12 h-12 rounded-full items-center justify-center ${
                            isLoading || !inputText.trim() ? "bg-slate-200" : "bg-blue-600"
                        }`}
                    >
                        <Ionicons name="send" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
