import { supabase } from './supabase';

export interface UploadResult {
    url: string;
    path: string;
}

export const uploadImage = async (file: File, bucket: string = 'profile-images'): Promise<UploadResult> => {
    try {
        // 파일명 생성 (타임스탬프 + 랜덤 문자열)
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileExt = file.name.split('.').pop();
        const fileName = `${timestamp}-${randomString}.${fileExt}`;
        
        // Supabase Storage에 업로드
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            throw error;
        }

        // 공개 URL 생성
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return {
            url: publicUrl,
            path: data.path
        };
    } catch (error) {
        console.error('이미지 업로드 실패:', error);
        throw new Error('이미지 업로드에 실패했습니다');
    }
};

export const deleteImage = async (path: string, bucket: string = 'profile-images'): Promise<void> => {
    try {
        const { error } = await supabase.storage
            .from(bucket)
            .remove([path]);

        if (error) {
            throw error;
        }
    } catch (error) {
        console.error('이미지 삭제 실패:', error);
        throw new Error('이미지 삭제에 실패했습니다');
    }
};
