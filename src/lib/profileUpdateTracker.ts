// 프로필 업데이트 과정 추적 유틸리티

export const profileUpdateTracker = {
    // 프로필 업데이트 시작
    startUpdate: (profileId: string, updateData: any) => {
        console.log('🚀 프로필 업데이트 시작:', {
            profileId,
            updateData,
            timestamp: new Date().toISOString()
        });
    },

    // 프로필 업데이트 완료
    completeUpdate: (profileId: string, updatedProfile: any) => {
        console.log('✅ 프로필 업데이트 완료:', {
            profileId,
            updatedProfile: {
                id: updatedProfile.id,
                nickname: updatedProfile.nickname,
                thumbnail_url: updatedProfile.thumbnail_url,
                updated_at: updatedProfile.updated_at
            },
            timestamp: new Date().toISOString()
        });
    },

    // 프로필 목록 새로고침
    refreshProfiles: (profiles: any[]) => {
        console.log('🔄 프로필 목록 새로고침:', {
            count: profiles.length,
            profiles: profiles.map(p => ({
                id: p.id,
                nickname: p.nickname,
                thumbnail_url: p.thumbnail_url,
                updated_at: p.updated_at
            })),
            timestamp: new Date().toISOString()
        });
    },

    // 로컬 스토리지 업데이트
    updateLocalStorage: (profile: any) => {
        console.log('💾 로컬 스토리지 업데이트:', {
            profile: {
                id: profile.id,
                nickname: profile.nickname,
                thumbnail_url: profile.thumbnail_url,
                updated_at: profile.updated_at
            },
            timestamp: new Date().toISOString()
        });
    },

    // 이미지 URL 변경 추적
    trackImageChange: (oldUrl: string | null, newUrl: string | null, profileId: string) => {
        console.log('🖼️ 이미지 URL 변경 추적:', {
            profileId,
            이전URL: oldUrl,
            새URL: newUrl,
            변경됨: oldUrl !== newUrl,
            timestamp: new Date().toISOString()
        });
    },

    // 컴포넌트 리렌더링 추적
    trackRerender: (componentName: string, profileId: string, reason: string) => {
        console.log('🔄 컴포넌트 리렌더링 추적:', {
            componentName,
            profileId,
            reason,
            timestamp: new Date().toISOString()
        });
    }
};

// 프로필 업데이트 상태 관리
export class ProfileUpdateState {
    private static instance: ProfileUpdateState;
    private updateInProgress: Set<string> = new Set();
    private lastUpdateTime: Map<string, number> = new Map();

    static getInstance(): ProfileUpdateState {
        if (!ProfileUpdateState.instance) {
            ProfileUpdateState.instance = new ProfileUpdateState();
        }
        return ProfileUpdateState.instance;
    }

    startUpdate(profileId: string): void {
        this.updateInProgress.add(profileId);
        this.lastUpdateTime.set(profileId, Date.now());
        console.log('📝 프로필 업데이트 상태 시작:', profileId);
    }

    completeUpdate(profileId: string): void {
        this.updateInProgress.delete(profileId);
        console.log('📝 프로필 업데이트 상태 완료:', profileId);
    }

    isUpdateInProgress(profileId: string): boolean {
        return this.updateInProgress.has(profileId);
    }

    getLastUpdateTime(profileId: string): number | undefined {
        return this.lastUpdateTime.get(profileId);
    }

    clear(): void {
        this.updateInProgress.clear();
        this.lastUpdateTime.clear();
        console.log('📝 프로필 업데이트 상태 초기화');
    }
}
