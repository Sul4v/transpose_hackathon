import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { FeedPostCard, FeedPostData } from '../../src/components';
import { OnboardingModal } from '../../src/components/OnboardingModal';
import { colors } from '../../src/styles/colors';

// Hardcoded event post from the Crustdata API response
const HACKATHON_POST: FeedPostData = {
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
};

const FEED_DATA: FeedPostData[] = [HACKATHON_POST];

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
