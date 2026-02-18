import { ScrollView, View } from "react-native";
import Hero from "../components/home/hero";
import ServiceTimesCard from "../components/home/service-times-card";
import MapCard from "../components/home/map-card";
import BottomTab from "../components/home/bottom-tab";

export default function HomeScreen() {
	return (
		<View className="flex-1 bg-slate-100">
			<ScrollView
				className="flex-1"
				contentContainerStyle={{ paddingBottom: 24 }}
				showsVerticalScrollIndicator={false}
			>
				<Hero />
				<View className="px-5">
					<ServiceTimesCard />
					<MapCard />
				</View>
			</ScrollView>
			<BottomTab />
		</View>
	);
}
