import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView>
      <Text className="text-2xl font-bold text-primary">Index</Text>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item, index }) => (
          <View className="p-4">
            <Pressable className="bg-amber-600 p-2">
              <Text className="text-white">{item}</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
