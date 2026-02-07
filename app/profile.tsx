import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../src/styles/colors';

type SettingsItem = {
    id: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    value?: string;
    type?: 'link' | 'info';
};

const SECTIONS = [
    {
        title: 'Account',
        data: [
            { id: 'email', label: 'Email', icon: 'mail-outline', value: 'user@example.com', type: 'info' },
            { id: 'password', label: 'Change password', icon: 'lock-closed-outline', type: 'link' },
        ],
    },
    {
        title: 'General',
        data: [
            { id: 'interests', label: 'Interests', icon: 'heart-outline', type: 'link' },
            { id: 'personalization', label: 'Personalization', icon: 'options-outline', type: 'link' },
            { id: 'notifications', label: 'Notifications', icon: 'notifications-outline', type: 'link' },
            { id: 'data', label: 'Data controls', icon: 'bar-chart-outline', type: 'link' },
        ]
    }
];

export default function ProfileScreen() {
    const displayName = 'User Name';
    const initials = 'UN';
    const email = 'user@example.com';

    const handlePress = (item: SettingsItem) => {
        console.log('Pressed:', item.id);
    };

    const renderItem = ({ item }: { item: SettingsItem }) => (
        <TouchableOpacity onPress={() => handlePress(item)} activeOpacity={0.7}>
            <View style={styles.itemContainer}>
                <View style={styles.itemLeft}>
                    <Ionicons name={item.icon} size={22} color={colors.textPrimary} style={styles.itemIcon} />
                    <Text style={styles.itemLabel}>{item.label}</Text>
                </View>
                <View style={styles.itemRight}>
                    {item.value && (
                        <Text style={styles.itemValue}>{item.value}</Text>
                    )}
                    {item.type !== 'info' && <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />}
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderSectionHeader = ({ title }: { title: string }) => {
        if (title === 'General') return <View style={styles.sectionSeparator} />;
        return <Text style={styles.sectionHeader}>{title}</Text>;
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                {/* Profile Info */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{initials}</Text>
                    </View>
                    <Text style={styles.userName}>{displayName}</Text>
                    <Text style={styles.userHandle}>{email}</Text>

                    <TouchableOpacity style={styles.editProfileButton}>
                        <Text style={styles.editProfileText}>Edit profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Settings List */}
                <View style={styles.settingsList}>
                    {SECTIONS.map((section, sectionIndex) => (
                        <View key={sectionIndex}>
                            {renderSectionHeader({ title: section.title })}
                            {section.data.map((item, itemIndex) => (
                                <React.Fragment key={item.id}>
                                    {renderItem({ item })}
                                    {itemIndex < section.data.length - 1 && <View style={styles.itemSeparator} />}
                                </React.Fragment>
                            ))}
                        </View>
                    ))}

                    {/* Sign Out Button */}
                    <TouchableOpacity style={styles.signOutButton} onPress={() => {
                        Alert.alert(
                            'Sign Out',
                            'Are you sure you want to sign out?',
                            [
                                { text: 'Cancel', style: 'cancel' },
                                { text: 'Sign Out', style: 'destructive', onPress: () => console.log('Sign out') },
                            ]
                        );
                    }}>
                        <Ionicons name="log-out-outline" size={22} color={colors.error} style={styles.itemIcon} />
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 8,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.textSecondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    avatarText: {
        fontSize: 32,
        color: colors.background,
        fontWeight: '400',
    },
    userName: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 4,
    },
    userHandle: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 16,
    },
    editProfileButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.surface,
    },
    editProfileText: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.textPrimary,
    },
    settingsList: {
        backgroundColor: colors.background,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textSecondary,
        marginLeft: 16,
        marginBottom: 8,
        marginTop: 16,
    },
    sectionSeparator: {
        height: 24,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemIcon: {
        marginRight: 16,
        width: 24,
    },
    itemLabel: {
        fontSize: 16,
        color: colors.textPrimary,
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemValue: {
        fontSize: 16,
        color: colors.textSecondary,
        marginRight: 8,
    },
    itemSeparator: {
        height: 1,
        backgroundColor: colors.surface,
        marginLeft: 56,
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginTop: 24,
    },
    signOutText: {
        fontSize: 16,
        color: colors.error,
        fontWeight: '500',
    },
});
