import "./global.css";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./app";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider className="flex-1 bg-slate-100">
      <StatusBar style="light" />
      <HomeScreen />
  </SafeAreaProvider>
);
}
