// 디버깅 유틸리티 함수들

export const debugImageLoading = {
    // 이미지 로딩 상태 로깅
    logImageLoad: (url: string, success: boolean, context: string = '') => {
        const timestamp = new Date().toISOString();
        const status = success ? '✅ 성공' : '❌ 실패';

        console.log(`[${timestamp}] 이미지 로딩 ${status}`, {
            url,
            context,
            success
        });
    },

    // Supabase 연결 상태 확인
    checkSupabaseConnection: async () => {
        try {
            const { supabase } = await import('./supabase');
            const { data, error } = await supabase.from('profiles').select('count').limit(1);

            if (error) {
                console.error('❌ Supabase 연결 실패:', error);
                return false;
            }

            console.log('✅ Supabase 연결 성공');
            return true;
        } catch (error) {
            console.error('❌ Supabase 연결 오류:', error);
            return false;
        }
    },

    // Storage 버킷 상태 확인
    checkStorageBucket: async (bucketName: string = 'profile-images') => {
        try {
            const { supabase } = await import('./supabase');
            const { data, error } = await supabase.storage.listBuckets();

            if (error) {
                console.error('❌ Storage 버킷 조회 실패:', error);
                return false;
            }

            const bucket = data?.find(b => b.name === bucketName);
            if (!bucket) {
                console.error(`❌ '${bucketName}' 버킷을 찾을 수 없습니다`);
                return false;
            }

            console.log(`✅ '${bucketName}' 버킷 확인됨:`, bucket);
            return true;
        } catch (error) {
            console.error('❌ Storage 버킷 확인 오류:', error);
            return false;
        }
    },

    // 환경 변수 확인
    checkEnvironmentVariables: () => {
        const requiredVars = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];

        const missing = requiredVars.filter(varName => !process.env[varName]);

        if (missing.length > 0) {
            console.error('❌ 누락된 환경 변수:', missing);
            return false;
        }

        console.log('✅ 모든 필수 환경 변수 확인됨');
        return true;
    },

    // 전체 시스템 상태 확인
    checkSystemStatus: async () => {
        console.log('🔍 시스템 상태 확인 시작...');

        const envCheck = debugImageLoading.checkEnvironmentVariables();
        const supabaseCheck = await debugImageLoading.checkSupabaseConnection();
        const storageCheck = await debugImageLoading.checkStorageBucket();

        const allGood = envCheck && supabaseCheck && storageCheck;

        console.log(allGood ? '✅ 모든 시스템 정상' : '❌ 일부 시스템에 문제가 있습니다');

        return {
            environment: envCheck,
            supabase: supabaseCheck,
            storage: storageCheck,
            overall: allGood
        };
    }
};

// 개발 환경에서만 사용할 수 있는 디버깅 함수
export const debugProfileImages = {
    // 프로필 이미지 URL 검증
    validateProfileImageUrl: (url: string | null | undefined) => {
        if (!url) {
            console.log('❌ 이미지 URL이 없습니다');
            return false;
        }

        if (!url.includes('supabase')) {
            console.log('❌ Supabase URL이 아닙니다:', url);
            return false;
        }

        if (!url.startsWith('http')) {
            console.log('❌ 유효하지 않은 URL 형식입니다:', url);
            return false;
        }

        console.log('✅ 이미지 URL 형식이 올바릅니다:', url);
        return true;
    },

    // 프로필 데이터 검증
    validateProfileData: (profile: any) => {
        console.log('🔍 프로필 데이터 검증:', {
            id: profile?.id,
            nickname: profile?.nickname,
            age: profile?.age,
            thumbnail_url: profile?.thumbnail_url,
            hasThumbnail: !!profile?.thumbnail_url
        });

        if (profile?.thumbnail_url) {
            return debugProfileImages.validateProfileImageUrl(profile.thumbnail_url);
        }

        return true;
    }
};
