import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../src/styles/colors';

function ProfileHeaderButton() {
    const router = useRouter();
    return (
        <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/profile' as any)}
        >
            <Ionicons name="person-circle-outline" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    profileButton: {
        marginRight: 16,
        padding: 4,
    },
});


export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopColor: colors.surface,
                    borderTopWidth: 1,
                    paddingBottom: 20,
                    paddingTop: 8,
                    height: 86,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTitleStyle: {
                    color: colors.textPrimary,
                    fontWeight: '600',
                    fontSize: 18,
                },
                headerShadowVisible: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Radarr',
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
                    ),
                    headerRight: () => <ProfileHeaderButton />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Saved',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'bookmark' : 'bookmark-outline'} size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    title: 'Inbox',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
