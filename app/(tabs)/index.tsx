import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { FeedPostCard, FeedPostData } from '../../src/components';
import { OnboardingModal } from '../../src/components/OnboardingModal';
import { colors } from '../../src/styles/colors';

// Mock event posts for the feed
const MOCK_POSTS: FeedPostData[] = [
    {
        id: '1',
        type: 'image',
        images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'],
        topic: 'Hackathon',
        caption: `🚨 Abu Dhabi, hackathon tomorrow night! 🇦🇪⚡️

We're hosting our next c0mpiled hackathon, a few high-intensity hours building agentic solutions around real problems in the region!

📅 Feb 7  •  📍Yas Marina Circuit

YC judges from Crustdata, Trace, Uplift AI and more. Open to builders!`,
        votes: 48,
        userVote: 0,
        isSaved: false,
        date: 'Feb 6, 2026',
    },
    {
        id: '2',
        type: 'image',
        images: ['https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800'],
        topic: 'AI Summit',
        caption: `🤖 Dubai AI Summit 2026 - Final speaker lineup announced!

Join 500+ AI leaders for two days of talks, demos, and networking. Featuring speakers from OpenAI, Anthropic, and Google DeepMind.

📅 Feb 15-16  •  📍Museum of the Future

Early bird tickets still available!`,
        votes: 124,
        userVote: 0,
        isSaved: false,
        date: 'Feb 15, 2026',
    },
    {
        id: '3',
        type: 'image',
        images: ['https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800'],
        topic: 'Startup Pitch',
        caption: `💰 Pitch Night Abu Dhabi - $50K in prizes!

10 startups. 3 minutes each. Winner takes $50K.

Looking for judges and mentors from the VC community. DM if interested!

📅 Feb 20  •  📍Hub71`,
        votes: 67,
        userVote: 0,
        isSaved: false,
        date: 'Feb 14, 2026',
    },
    {
        id: '4',
        type: 'image',
        images: ['https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800'],
        topic: 'Tech Meetup',
        caption: `☕ Founders Coffee - Weekly meetup for builders

Every Thursday morning, we gather to share what we're working on, get feedback, and connect with other founders in the UAE.

No pitch decks. Just real conversations.

📅 Every Thursday  •  📍DIFC`,
        votes: 89,
        userVote: 0,
        isSaved: false,
        date: 'Feb 23, 2026',
    },
];

const FEED_DATA: FeedPostData[] = MOCK_POSTS;

export default function HomeScreen() {
    const router = useRouter();
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [posts, setPosts] = useState<FeedPostData[]>(FEED_DATA);

    const handleOnboardingComplete = () => {
        setShowOnboarding(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };

    const handleGoInDepth = (postId: string) => {
        router.push('/post-details');
    };

    const handleUpvote = (postId: string) => {
        setPosts(currentPosts =>
            currentPosts.map(post => {
                if (post.id !== postId) return post;
                const currentVote = post.userVote ?? 0;
                let newVote: -1 | 0 | 1;
                let voteDelta: number;
                if (currentVote === 1) {
                    newVote = 0; voteDelta = -1;
                } else if (currentVote === -1) {
                    newVote = 1; voteDelta = 2;
                } else {
                    newVote = 1; voteDelta = 1;
                }
                return { ...post, userVote: newVote, votes: (post.votes ?? 0) + voteDelta };
            })
        );
    };

    const handleDownvote = (postId: string) => {
        setPosts(currentPosts =>
            currentPosts.map(post => {
                if (post.id !== postId) return post;
                const currentVote = post.userVote ?? 0;
                let newVote: -1 | 0 | 1;
                let voteDelta: number;
                if (currentVote === -1) {
                    newVote = 0; voteDelta = 1;
                } else if (currentVote === 1) {
                    newVote = -1; voteDelta = -2;
                } else {
                    newVote = -1; voteDelta = -1;
                }
                return { ...post, userVote: newVote, votes: (post.votes ?? 0) + voteDelta };
            })
        );
    };

    const handleSave = (postId: string) => {
        setPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId ? { ...post, isSaved: !post.isSaved } : post
            )
        );
    };

    return (
        <View style={styles.container}>
            <OnboardingModal
                visible={showOnboarding}
                onComplete={handleOnboardingComplete}
            />

            <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContent}
                data={posts}
                renderItem={({ item }) => (
                    <FeedPostCard
                        post={item}
                        onUpvote={handleUpvote}
                        onDownvote={handleDownvote}
                        onSave={handleSave}
                        onGoInDepth={handleGoInDepth}
                    />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.primary}
                    />
                }
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingTop: 8,
        paddingBottom: 32,
    },
    separator: {
        height: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.surface,
    },
});
