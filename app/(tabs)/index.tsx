import { useRouter } from 'expo-router';
import React from 'react';
import { Animated, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { CategoryList, FeedPostCard, FeedPostData } from '../../src/components';
import { useToast } from '../../src/context/ToastContext';
import { colors } from '../../src/styles/colors';

// Placeholder feed data with sample images
const FEED_DATA: FeedPostData[] = [
    {
        id: '1',
        type: 'image',
        images: [
            'https://picsum.photos/seed/post1/800/800',
        ],
        topic: 'AI Agents',
        caption: 'Codex released an App on Mac. You can now run agents parallely within the same app window. They are also giving 2x tokens for a limited time.',
        votes: 248,
        userVote: 0,
        isSaved: false,
        date: 'Jan 27, 2026',
    },
    {
        id: '2',
        type: 'image',
        images: ['https://picsum.photos/seed/post2/800/800'],
        topic: 'Venture Capital',
        caption: 'QIA expanded its venture capital programme to $3B from $1B and introduced a new 10 year residency program for entrepreneurs.',
        votes: 89,
        userVote: 1,
        isSaved: false,
        date: 'Jan 26, 2026',
    },
    {
        id: '3',
        type: 'image',
        images: ['https://picsum.photos/seed/post3/800/800'],
        topic: 'Startups',
        caption: 'Y Combinator released requests for startups including "AI-Native Agencies" - a category that Orecce might fall into.',
        votes: 1024,
        userVote: 0,
        isSaved: true,
        date: 'Jan 25, 2026',
    },
];

export default function HomeScreen() {
    const router = useRouter();
    const [refreshing, setRefreshing] = React.useState(false);
    const [posts, setPosts] = React.useState<FeedPostData[]>(FEED_DATA);
    const [isScrolling, setIsScrolling] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const skeletonPulse = React.useRef(new Animated.Value(0.6)).current;

    React.useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(skeletonPulse, { toValue: 0.3, duration: 500, useNativeDriver: true }),
                Animated.timing(skeletonPulse, { toValue: 0.9, duration: 500, useNativeDriver: true }),
            ])
        );
        loop.start();

        const timer = setTimeout(() => {
            setIsLoading(false);
            loop.stop();
        }, 1500);

        return () => {
            loop.stop();
            clearTimeout(timer);
        };
    }, [skeletonPulse]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1500);
    }, []);

    const handleGoInDepth = (postId: string) => {
        console.log('Go in depth:', postId);
        // TODO: Navigate to post details
    };

    const handleUpvote = (postId: string) => {
        setPosts((currentPosts) =>
            currentPosts.map((post) => {
                if (post.id !== postId) return post;

                const currentVote = post.userVote ?? 0;
                let newVote: -1 | 0 | 1;
                let voteDelta: number;

                if (currentVote === 1) {
                    newVote = 0;
                    voteDelta = -1;
                } else if (currentVote === -1) {
                    newVote = 1;
                    voteDelta = 2;
                } else {
                    newVote = 1;
                    voteDelta = 1;
                }

                return {
                    ...post,
                    userVote: newVote,
                    votes: (post.votes ?? 0) + voteDelta,
                };
            })
        );
    };

    const handleDownvote = (postId: string) => {
        setPosts((currentPosts) =>
            currentPosts.map((post) => {
                if (post.id !== postId) return post;

                const currentVote = post.userVote ?? 0;
                let newVote: -1 | 0 | 1;
                let voteDelta: number;

                if (currentVote === -1) {
                    newVote = 0;
                    voteDelta = 1;
                } else if (currentVote === 1) {
                    newVote = -1;
                    voteDelta = -2;
                } else {
                    newVote = -1;
                    voteDelta = -1;
                }

                return {
                    ...post,
                    userVote: newVote,
                    votes: (post.votes ?? 0) + voteDelta,
                };
            })
        );
    };

    const { showToast } = useToast();

    const handleSave = (postId: string) => {
        setPosts((currentPosts) =>
            currentPosts.map((post) => {
                if (post.id === postId) {
                    const newIsSaved = !post.isSaved;

                    if (newIsSaved) {
                        showToast({
                            message: 'Saved',
                            type: 'save',
                            actionLabel: 'View',
                            onAction: () => router.push('/(tabs)/saved'),
                        });
                    } else {
                        showToast({
                            message: 'Removed from saved',
                            type: 'unsave',
                        });
                    }

                    return { ...post, isSaved: newIsSaved };
                }
                return post;
            })
        );
    };

    const handleShare = (postId: string) => {
        console.log('Share post:', postId);
    };

    const handleTopicPress = (postId: string) => {
        console.log('Topic pressed for post:', postId);
    };

    if (isLoading) {
        const skeletonItems = [1, 2, 3];
        return (
            <FlatList
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                data={skeletonItems}
                keyExtractor={(item) => `skeleton-${item}`}
                ListHeaderComponent={<CategoryList />}
                renderItem={() => (
                    <Animated.View style={[styles.skeletonCard, { opacity: skeletonPulse }]}>
                        <View style={styles.skeletonHeader} />
                        <View style={styles.skeletonImage} />
                        <View style={styles.skeletonTextShort} />
                        <View style={styles.skeletonTextLong} />
                    </Animated.View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
            />
        );
    }

    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            ListHeaderComponent={<CategoryList />}
            data={posts}
            renderItem={({ item }) => (
                <FeedPostCard
                    post={item}
                    onUpvote={handleUpvote}
                    onDownvote={handleDownvote}
                    onSave={handleSave}
                    onShare={handleShare}
                    onPress={handleTopicPress}
                    onGoInDepth={handleGoInDepth}
                    isMenuForceClose={isScrolling}
                />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={() => setIsScrolling(true)}
            onScrollEndDrag={() => setIsScrolling(false)}
            onMomentumScrollEnd={() => setIsScrolling(false)}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={colors.primary}
                />
            }
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    contentContainer: {
        paddingTop: 8,
        paddingBottom: 16,
    },
    separator: {
        height: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.surface,
    },
    skeletonCard: {
        backgroundColor: colors.background,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
    },
    skeletonHeader: {
        width: 140,
        height: 16,
        borderRadius: 8,
        backgroundColor: colors.surface,
        marginBottom: 12,
    },
    skeletonImage: {
        height: 200,
        borderRadius: 12,
        backgroundColor: colors.surface,
        marginBottom: 12,
    },
    skeletonTextShort: {
        width: '40%',
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.surface,
        marginBottom: 8,
    },
    skeletonTextLong: {
        width: '75%',
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.surface,
    },
});
