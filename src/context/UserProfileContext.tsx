import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = '@user_profile';

export interface UserProfile {
    name: string;
    role: string;
    interests: string;
    hasCompletedOnboarding: boolean;
}

const DEFAULT_PROFILE: UserProfile = {
    name: '',
    role: '',
    interests: '',
    hasCompletedOnboarding: false,
};

interface UserProfileContextType {
    profile: UserProfile;
    updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
    completeOnboarding: () => Promise<void>;
    resetProfile: () => Promise<void>;
    isLoading: boolean;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const saved = await AsyncStorage.getItem(STORAGE_KEY);
            if (saved) {
                setProfile(JSON.parse(saved));
            }
        } catch (error) {
            console.error('Failed to load profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveProfile = async (newProfile: UserProfile) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
        } catch (error) {
            console.error('Failed to save profile:', error);
        }
    };

    const updateProfile = async (updates: Partial<UserProfile>) => {
        const newProfile = { ...profile, ...updates };
        setProfile(newProfile);
        await saveProfile(newProfile);
    };

    const completeOnboarding = async () => {
        await updateProfile({ hasCompletedOnboarding: true });
    };

    const resetProfile = async () => {
        setProfile(DEFAULT_PROFILE);
        await saveProfile(DEFAULT_PROFILE);
    };

    return (
        <UserProfileContext.Provider value={{ profile, updateProfile, completeOnboarding, resetProfile, isLoading }}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const useUserProfile = () => {
    const context = useContext(UserProfileContext);
    if (context === undefined) {
        throw new Error('useUserProfile must be used within a UserProfileProvider');
    }
    return context;
};
