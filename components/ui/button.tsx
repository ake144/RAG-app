import { Pressable, Text, View } from "react-native";

type PrimaryButtonProps = {
  label: string;
  icon?: string;
  onPress?: () => void;
};

export default function PrimaryButton({
  label,
  icon,
  onPress,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-center rounded-2xl bg-blue-600 px-5 py-4"
    >
      {icon ? (
        <View className="mr-2 h-6 w-6 items-center justify-center rounded-full bg-white/20">
          <Text className="text-xs text-white">{icon}</Text>
        </View>
      ) : null}
      <Text className="text-base font-semibold text-white">{label}</Text>
    </Pressable>
  );
}
