import { supabase } from './supabase';

export interface UploadResult {
    url: string;
    path: string;
}

export const uploadImage = async (file: File, bucket: string = 'profile-images'): Promise<UploadResult> => {
    try {
        // Supabase 연결 확인
        if (!supabase) {
            throw new Error('Supabase 클라이언트가 초기화되지 않았습니다');
        }

        // 파일명 생성 (타임스탬프 + 랜덤 문자열)
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileExt = file.name.split('.').pop() || 'jpg';
        const fileName = `${timestamp}-${randomString}.${fileExt}`;

        console.log('이미지 업로드 시작:', {
            fileName,
            fileSize: file.size,
            fileType: file.type,
            bucket
        });

        // Supabase Storage에 업로드
        const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        });

        if (error) {
            console.error('Storage 업로드 오류:', {
                error,
                fileName,
                bucket,
                fileSize: file.size
            });
            throw new Error(`Storage 업로드 실패: ${error.message}`);
        }

        console.log('업로드 성공:', data);

        // 공개 URL 생성
        const {
            data: { publicUrl }
        } = supabase.storage.from(bucket).getPublicUrl(data.path);

        console.log('공개 URL 생성:', {
            publicUrl,
            path: data.path,
            bucket,
            fileName
        });

        // URL 유효성 검증
        if (!publicUrl || !publicUrl.includes('supabase')) {
            throw new Error('유효하지 않은 공개 URL이 생성되었습니다');
        }

        return {
            url: publicUrl,
            path: data.path
        };
    } catch (error) {
        console.error('이미지 업로드 실패:', {
            error,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type
        });
        throw new Error(`이미지 업로드에 실패했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
};

export const deleteImage = async (path: string, bucket: string = 'profile-images'): Promise<void> => {
    try {
        const { error } = await supabase.storage.from(bucket).remove([path]);

        if (error) {
            throw error;
        }
    } catch (error) {
        console.error('이미지 삭제 실패:', error);
        throw new Error('이미지 삭제에 실패했습니다');
    }
};

// 이미지 URL 유효성 검증 함수
export const validateImageUrl = async (url: string): Promise<boolean> => {
    try {
        if (!url || !url.includes('supabase')) {
            return false;
        }

        // HEAD 요청으로 이미지 존재 여부 확인
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.error('이미지 URL 검증 실패:', { url, error });
        return false;
    }
};

// 이미지 URL을 안전하게 가져오는 함수
export const getSafeImageUrl = (url: string | null | undefined): string | null => {
    if (!url || typeof url !== 'string') {
        return null;
    }

    // Supabase URL 형식 검증
    if (!url.includes('supabase') || !url.startsWith('http')) {
        console.warn('유효하지 않은 이미지 URL:', url);
        return null;
    }

    return url;
};
