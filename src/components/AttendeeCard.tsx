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
                <Text style={styles.meta} numberOfLines={1}>
                    {attendee.company} · {attendee.location}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.emailButton}
                onPress={() => onContact?.(attendee)}
                activeOpacity={0.7}
            >
                <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.surface,
    },
    avatarContainer: {
        marginRight: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    avatarPlaceholder: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.textPrimary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitial: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 2,
    },
    title: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 2,
    },
    meta: {
        fontSize: 13,
        color: colors.textMuted,
    },
    emailButton: {
        padding: 8,
    },
});
