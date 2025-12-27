import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';

interface SignInProps {
  email: string;
  password: string;
}

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SignInProps>({
    email: '',
    password: '',
  });
  const submit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please enter valid email and password');
      return;
    }
    setIsSubmitting(true);
    try {
      Alert.alert('Success', 'User signed in successfully');
      router.push('/');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={(text) => {
          setFormData({ ...formData, email: text });
        }}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={formData.password}
        onChangeText={(text) => {
          setFormData({ ...formData, password: text });
        }}
        label="Password"
        keyboardType="email-address"
      />
      <CustomButton title="Sign In" onPress={submit} isLoading={isSubmitting} />

      <View className="flex flex-row w-full justify-center mt-5  gap-2">
        <Text className="base-regular text-gray-100">
          Don't have an account?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
