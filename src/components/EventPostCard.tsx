import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/colors';
import { AttendeeCard, EventAttendee } from './AttendeeCard';

export interface EventPost {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    imageUrl?: string;
    authorName: string;
    authorTitle: string;
    authorAvatar?: string;
    authorCompany: string;
    totalReactions: number;
    totalComments: number;
    linkedinUrl: string;
    attendees: EventAttendee[];
}

interface EventPostCardProps {
    event: EventPost;
    onContactAttendee?: (attendee: EventAttendee) => void;
}

export function EventPostCard({ event, onContactAttendee }: EventPostCardProps) {
    const [showAttendees, setShowAttendees] = useState(true);

    return (
        <View style={styles.container}>
            {/* Event Header */}
            <View style={styles.header}>
                <View style={styles.authorSection}>
                    {event.authorAvatar ? (
                        <Image source={{ uri: event.authorAvatar }} style={styles.authorAvatar} />
                    ) : (
                        <View style={styles.authorAvatarPlaceholder}>
                            <Text style={styles.authorInitial}>
                                {event.authorName.charAt(0)}
                            </Text>
                        </View>
                    )}
                    <View style={styles.authorInfo}>
                        <Text style={styles.authorName}>{event.authorName}</Text>
                        <Text style={styles.authorTitle} numberOfLines={1}>
                            {event.authorTitle} at {event.authorCompany}
                        </Text>
                    </View>
                </View>
                <Text style={styles.datePosted}>{event.date}</Text>
            </View>

            {/* Event Image */}
            {event.imageUrl && (
                <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />
            )}

            {/* Event Details */}
            <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{event.title}</Text>

                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <Ionicons name="calendar-outline" size={16} color={colors.primary} />
                        <Text style={styles.metaText}>{event.date}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Ionicons name="location-outline" size={16} color={colors.primary} />
                        <Text style={styles.metaText}>{event.location}</Text>
                    </View>
                </View>

                <Text style={styles.eventDescription} numberOfLines={4}>
                    {event.description}
                </Text>

                {/* Engagement Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Ionicons name="heart" size={16} color={colors.textMuted} />
                        <Text style={styles.statText}>{event.totalReactions}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Ionicons name="chatbubble" size={16} color={colors.textMuted} />
                        <Text style={styles.statText}>{event.totalComments} comments</Text>
                    </View>
                </View>
            </View>

            {/* Attendees Section */}
            <TouchableOpacity
                style={styles.attendeesHeader}
                onPress={() => setShowAttendees(!showAttendees)}
                activeOpacity={0.7}
            >
                <View style={styles.attendeesHeaderLeft}>
                    <Ionicons name="people" size={20} color={colors.primary} />
                    <Text style={styles.attendeesTitle}>
                        Commenters Attending ({event.attendees.length})
                    </Text>
                </View>
                <Ionicons
                    name={showAttendees ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={colors.textSecondary}
                />
            </TouchableOpacity>

            {showAttendees && (
                <View style={styles.attendeesList}>
                    {event.attendees.map((attendee) => (
                        <AttendeeCard
                            key={attendee.id}
                            attendee={attendee}
                            onContact={onContactAttendee}
                        />
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 16,
        paddingBottom: 12,
    },
    authorSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    authorAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 12,
    },
    authorAvatarPlaceholder: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    authorInitial: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
    authorInfo: {
        flex: 1,
    },
    authorName: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    authorTitle: {
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: 2,
    },
    datePosted: {
        fontSize: 12,
        color: colors.textMuted,
    },
    eventImage: {
        width: '100%',
        height: 200,
        backgroundColor: colors.surface,
    },
    eventDetails: {
        padding: 16,
    },
    eventTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: 12,
    },
    metaRow: {
        flexDirection: 'row',
        marginBottom: 12,
        gap: 16,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    eventDescription: {
        fontSize: 15,
        color: colors.textPrimary,
        lineHeight: 22,
        marginBottom: 16,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: colors.surface,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        fontSize: 14,
        color: colors.textMuted,
    },
    attendeesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.surface,
        padding: 16,
        marginHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
    },
    attendeesHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    attendeesTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    attendeesList: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});
