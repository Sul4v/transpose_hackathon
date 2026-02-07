import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AttendeeCard, EventAttendee, FeedPostCard, FeedPostData } from '../src/components';
import { colors } from '../src/styles/colors';

// Hardcoded event post - same as in index.tsx
const HACKATHON_POST: FeedPostData = {
    id: '1',
    type: 'image',
    images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'],
    topic: 'Hackathon',
    caption: `🚨 Abu Dhabi, hackathon tomorrow night! 🇦🇪⚡️

We're hosting our next c0mpiled hackathon, a few high-intensity hours building agentic solutions around real problems in the region!

📅 Feb 7
📍Yas Marina Circuit, Yas Island
🕓 4:00–5:45pm — networking + team formation
🕕 5:45–10:00pm — hackathon + prizes

We'll be building agentic solutions aimed at real problems experienced by people in the region and we're very lucky to have YC judges / partners joining from the teams at Crustdata (YC F24), Lingo.dev, Lyra, SF Tensor, Trace (YC S25), Uplift AI and Unbound.

Open to builders with food, drinks, judging, and prizes included.`,
    votes: 48,
    userVote: 0,
    isSaved: false,
    date: 'Feb 6, 2026',
};

// Commenters attending
const COMMENTERS: EventAttendee[] = [
    {
        id: '1',
        name: 'Hammad Malik',
        title: 'Chief Executive Officer',
        company: 'Uplift AI',
        location: 'Washington, United States',
        linkedinUrl: 'https://www.linkedin.com/in/hammad2',
    },
    {
        id: '2',
        name: 'Sabba Petri',
        title: 'Chief Technology Officer',
        company: 'Transpose Platform',
        location: 'United Arab Emirates',
        linkedinUrl: 'https://www.linkedin.com/in/sabbapetri',
    },
    {
        id: '3',
        name: 'Adib Behjat',
        title: 'Partner',
        company: 'Y Combinator',
        location: 'San Francisco, CA',
        linkedinUrl: 'https://www.linkedin.com/in/adibbehjat',
    },
    {
        id: '4',
        name: 'Michael Arandid',
        title: 'Global Talent Partner',
        company: 'Department of Health Abu Dhabi',
        location: 'United Arab Emirates',
        linkedinUrl: 'https://www.linkedin.com/in/michaelarandid',
    },
    {
        id: '5',
        name: 'Veronica Lee',
        title: 'Community Lead',
        company: 'Tech Hub UAE',
        location: 'Dubai, UAE',
        linkedinUrl: 'https://www.linkedin.com/in/veronicale',
    },
];

export default function PostDetailsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams();
    const [post, setPost] = useState<FeedPostData>(HACKATHON_POST);
    const [showCommenters, setShowCommenters] = useState(true);

    const handleBack = () => {
        router.back();
    };

    const handleContactAttendee = (attendee: EventAttendee) => {
        console.log('Contact:', attendee.name);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{post.topic || 'Event'}</Text>
                <View style={styles.backButton} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Full Post */}
                <FeedPostCard
                    post={post}
                    showFullContent
                    detailsMode
                />

                {/* Commenters Section */}
                <TouchableOpacity
                    style={styles.commentersHeader}
                    onPress={() => setShowCommenters(!showCommenters)}
                    activeOpacity={0.7}
                >
                    <View style={styles.commentersHeaderLeft}>
                        <Ionicons name="chatbubbles" size={20} color={colors.primary} />
                        <Text style={styles.commentersTitle}>
                            Commenters Attending ({COMMENTERS.length})
                        </Text>
                    </View>
                    <Ionicons
                        name={showCommenters ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color={colors.textSecondary}
                    />
                </TouchableOpacity>

                {showCommenters && (
                    <View style={styles.commentersList}>
                        {COMMENTERS.map((attendee) => (
                            <AttendeeCard
                                key={attendee.id}
                                attendee={attendee}
                                onContact={handleContactAttendee}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.surface,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    commentersHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.surface,
        marginHorizontal: 16,
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
    },
    commentersHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    commentersTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    commentersList: {
        paddingHorizontal: 16,
        paddingTop: 12,
    },
});
