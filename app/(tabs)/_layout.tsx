import { images } from '@/constants';
import { useAuthStore } from '@/store/auth.store';
import cn from 'clsx';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';

interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={icon}
        className="size-7"
        resizeMode="contain"
        tintColor={focused ? '#FE8C00' : '#5D5F6D'}
      />
      <Text
        className={cn(
          'text-xs font-bold w-full text-center',
          focused ? 'text-primary' : 'text-dark-200',
        )}
      >
        {title}
      </Text>
    </View>
  );
};

const _Layout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href={'/sign-in'} />;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 15,
          height: 70, // Reduced from 80
          paddingBottom: 5, // Add padding
          paddingTop: 20,
          position: 'absolute',
          bottom: 20,
          backgroundColor: 'white',
          shadowColor: '#1a1a1a',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.bag} title="Cart" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={images.person}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
