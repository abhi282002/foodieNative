import { router } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

const SingUp = () => {
  return (
    <View>
      <Text>SingUp</Text>
      <Button title="Sign Up" onPress={() => router.push('/sign-in')} />
    </View>
  );
};

export default SingUp;
