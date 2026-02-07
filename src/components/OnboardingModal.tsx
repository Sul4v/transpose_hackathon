import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../styles/colors';

interface OnboardingModalProps {
    visible: boolean;
    onComplete: (data: { name: string; role: string; interests: string }) => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export function OnboardingModal({ visible, onComplete }: OnboardingModalProps) {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [interests, setInterests] = useState('');

    const handleSubmit = () => {
        onComplete({ name, role, interests });
    };

    const isFormValid = name.trim().length > 0;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            statusBarTranslucent
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Ionicons name="people" size={40} color={colors.primary} />
                        </View>
                        <Text style={styles.title}>Welcome to EventConnect</Text>
                        <Text style={styles.subtitle}>
                            Tell us about yourself so we can find the best events and people for you
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>What's your name?</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., John Doe"
                                placeholderTextColor={colors.textMuted}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>What do you do?</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., Software Engineer, Founder, Student"
                                placeholderTextColor={colors.textMuted}
                                value={role}
                                onChangeText={setRole}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>What are you interested in?</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="e.g., AI, Startups, Hackathons, Web3, Networking..."
                                placeholderTextColor={colors.textMuted}
                                value={interests}
                                onChangeText={setInterests}
                                multiline
                                numberOfLines={3}
                                textAlignVertical="top"
                            />
                        </View>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={!isFormValid}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.submitButtonText}>Find Events For Me</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.disclaimer}>
                        We'll use this to match you with relevant events and attendees
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        paddingTop: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    form: {
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: colors.textPrimary,
        borderWidth: 1,
        borderColor: colors.surface,
    },
    textArea: {
        minHeight: 100,
        paddingTop: 16,
    },
    submitButton: {
        backgroundColor: colors.primary,
        borderRadius: 30,
        paddingVertical: 16,
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 16,
    },
    submitButtonDisabled: {
        opacity: 0.5,
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    disclaimer: {
        fontSize: 13,
        color: colors.textMuted,
        textAlign: 'center',
    },
});
