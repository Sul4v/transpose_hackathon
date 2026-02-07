import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
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

export function OnboardingModal({ visible, onComplete }: OnboardingModalProps) {
    const [name, setName] = useState('');
    const [aboutMe, setAboutMe] = useState('');

    if (!visible) return null;

    const handleSubmit = () => {
        onComplete({ name, role: '', interests: aboutMe });
    };

    const isFormValid = name.trim().length > 0;

    return (
        <View style={styles.overlay}>
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
                        <Text style={styles.title}>Tell us about yourself</Text>
                        <Text style={styles.subtitle}>
                            We'll find events that match your interests
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Your name"
                                placeholderTextColor={colors.textMuted}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>What are you into?</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Tell us what you like to do..."
                                placeholderTextColor={colors.textMuted}
                                value={aboutMe}
                                onChangeText={setAboutMe}
                                multiline
                                numberOfLines={4}
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
                        <Text style={styles.submitButtonText}>Continue</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.background,
        zIndex: 100,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        paddingTop: 80,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        lineHeight: 24,
    },
    form: {
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.textSecondary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.background,
        borderRadius: 8,
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
        backgroundColor: colors.textPrimary,
        borderRadius: 999,
        paddingVertical: 16,
        alignItems: 'center',
    },
    submitButtonDisabled: {
        opacity: 0.3,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
