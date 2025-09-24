// 프로필 이미지 업데이트 디버깅 유틸리티

export const profileImageDebug = {
    // 프로필 업데이트 과정 추적
    trackProfileUpdate: (step: string, data: any) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] 프로필 업데이트 - ${step}:`, data);
    },

    // 이미지 URL 변경 추적
    trackImageUrlChange: (oldUrl: string | null, newUrl: string | null, context: string = '') => {
        console.log(`🖼️ 이미지 URL 변경 추적 [${context}]:`, {
            이전URL: oldUrl,
            새URL: newUrl,
            변경됨: oldUrl !== newUrl,
            이전URL존재: !!oldUrl,
            새URL존재: !!newUrl
        });
    },

    // 프로필 데이터 비교
    compareProfileData: (oldProfile: any, newProfile: any) => {
        console.log('📊 프로필 데이터 비교:', {
            닉네임변경: oldProfile.nickname !== newProfile.nickname,
            나이변경: oldProfile.age !== newProfile.age,
            이미지변경: oldProfile.thumbnail_url !== newProfile.thumbnail_url,
            상세비교: {
                닉네임: { 이전: oldProfile.nickname, 새: newProfile.nickname },
                나이: { 이전: oldProfile.age, 새: newProfile.age },
                이미지: { 이전: oldProfile.thumbnail_url, 새: newProfile.thumbnail_url }
            }
        });
    },

    // 상태 업데이트 추적
    trackStateUpdate: (componentName: string, oldState: any, newState: any) => {
        console.log(`🔄 상태 업데이트 추적 [${componentName}]:`, {
            이전상태: oldState,
            새상태: newState,
            변경사항: Object.keys(newState).reduce((changes, key) => {
                if (oldState[key] !== newState[key]) {
                    changes[key] = { 이전: oldState[key], 새: newState[key] };
                }
                return changes;
            }, {} as any)
        });
    },

    // 이미지 로딩 상태 추적
    trackImageLoading: (url: string, status: 'start' | 'success' | 'error', context: string = '') => {
        const emoji = status === 'start' ? '⏳' : status === 'success' ? '✅' : '❌';
        console.log(`${emoji} 이미지 로딩 추적 [${context}]:`, {
            URL: url,
            상태: status,
            시간: new Date().toISOString()
        });
    }
};

// 개발 환경에서만 사용할 수 있는 디버깅 함수
export const devProfileDebug = {
    // 프로필 업데이트 시뮬레이션
    simulateProfileUpdate: async (profileId: string, updates: any) => {
        console.log('🧪 프로필 업데이트 시뮬레이션:', { profileId, updates });

        // 실제 업데이트 전후 상태 비교를 위한 로깅
        profileImageDebug.trackProfileUpdate('시뮬레이션 시작', { profileId, updates });

        return { profileId, updates, simulated: true };
    },

    // 이미지 URL 검증
    validateImageUrl: (url: string) => {
        const isValid = url && url.includes('supabase') && url.startsWith('http');
        console.log('🔍 이미지 URL 검증:', {
            URL: url,
            유효함: isValid,
            Supabase포함: url.includes('supabase'),
            HTTP시작: url.startsWith('http')
        });
        return isValid;
    }
};
