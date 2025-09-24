'use client';

import { useState, useEffect } from 'react';
import { Profile } from '@/types';

const CURRENT_PROFILE_KEY = 'kidsedu_current_profile';

export function useCurrentProfile() {
    const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 클라이언트 사이드에서만 실행
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(CURRENT_PROFILE_KEY);
            if (stored) {
                try {
                    setCurrentProfile(JSON.parse(stored));
                } catch (error) {
                    console.error('프로필 데이터 파싱 오류:', error);
                    localStorage.removeItem(CURRENT_PROFILE_KEY);
                }
            }
            setLoading(false);
        }
    }, []);

    const setProfile = (profile: Profile | null) => {
        console.log('useCurrentProfile - 프로필 설정:', {
            이전프로필: currentProfile
                ? {
                      id: currentProfile.id,
                      nickname: currentProfile.nickname,
                      thumbnail_url: currentProfile.thumbnail_url
                  }
                : null,
            새프로필: profile
                ? {
                      id: profile.id,
                      nickname: profile.nickname,
                      thumbnail_url: profile.thumbnail_url
                  }
                : null
        });

        setCurrentProfile(profile);
        if (typeof window !== 'undefined') {
            if (profile) {
                localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(profile));
                console.log('useCurrentProfile - 로컬 스토리지에 프로필 저장 완료');
            } else {
                localStorage.removeItem(CURRENT_PROFILE_KEY);
                console.log('useCurrentProfile - 로컬 스토리지에서 프로필 제거 완료');
            }
        }
    };

    const clearProfile = () => {
        setProfile(null);
    };

    return {
        currentProfile,
        setProfile,
        clearProfile,
        loading
    };
}
