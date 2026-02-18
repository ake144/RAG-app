import { ImageBackground, Text, View } from "react-native";

const HERO_IMAGE = {
  uri: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80",
};

export default function Hero() {
  return (
    <View className="w-full h-[380px]">
      <ImageBackground
        source={HERO_IMAGE}
        className="flex-1"
        resizeMode="cover"
      >
        <View className="absolute inset-0 bg-black/50" />
        <View className="flex-1 justify-end px-6 pb-8">
          <View className="self-start rounded-full bg-blue-500 px-4 py-2">
            <Text className="text-white text-xs font-semibold tracking-wider">
              WELCOME HOME
            </Text>
          </View>
          <Text className="mt-4 text-4xl font-bold text-white">
            Grace Community
          </Text>
          <Text className="text-4xl font-bold text-white">Church</Text>
          <Text className="mt-3 text-base text-white/80">
            A place to belong, believe, and become.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
