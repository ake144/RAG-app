import "./global.css";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import HomeScreen from "./components/home/home-screen";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <StatusBar style="light" />
      <HomeScreen />
    </SafeAreaView>
  );
}
