import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/colors';

export interface EventAttendee {
    id: string;
    name: string;
    title: string;
    company: string;
    location: string;
    linkedinUrl: string;
    avatarUrl?: string;
}

interface AttendeeCardProps {
    attendee: EventAttendee;
    onContact?: (attendee: EventAttendee) => void;
}

export function AttendeeCard({ attendee, onContact }: AttendeeCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                {attendee.avatarUrl ? (
                    <Image source={{ uri: attendee.avatarUrl }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarInitial}>
                            {attendee.name.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{attendee.name}</Text>
                <Text style={styles.title} numberOfLines={1}>{attendee.title}</Text>
                <Text style={styles.company} numberOfLines={1}>
                    <Ionicons name="business-outline" size={12} color={colors.textMuted} />
                    {' '}{attendee.company}
                </Text>
                <Text style={styles.location} numberOfLines={1}>
                    <Ionicons name="location-outline" size={12} color={colors.textMuted} />
                    {' '}{attendee.location}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.contactButton}
                onPress={() => onContact?.(attendee)}
                activeOpacity={0.7}
            >
                <Ionicons name="chatbubble-outline" size={18} color={colors.primary} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
    },
    avatarContainer: {
        marginRight: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitial: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 2,
    },
    title: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    company: {
        fontSize: 12,
        color: colors.textMuted,
        marginBottom: 2,
    },
    location: {
        fontSize: 12,
        color: colors.textMuted,
    },
    contactButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.primary,
    },
});
