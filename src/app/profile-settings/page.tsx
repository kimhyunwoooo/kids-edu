'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { useProfiles } from '@/hooks/useProfiles';
import ProfileForm from '@/components/ProfileForm';
import { CreateProfileData, UpdateProfileData } from '@/types';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

export default function ProfileSettingsPage() {
    const router = useRouter();
    const { currentProfile, setProfile, loading: profileLoading } = useCurrentProfile();
    const { updateProfile, deleteProfile } = useProfiles();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (!profileLoading && !currentProfile) {
            router.push('/intro');
        }
    }, [currentProfile, profileLoading, router]);

    const handleUpdateProfile = async (data: CreateProfileData | UpdateProfileData) => {
        if (!currentProfile) return;

        setIsUpdating(true);
        try {
            const updatedProfile = await updateProfile(currentProfile.id, data as UpdateProfileData);
            if (updatedProfile) {
                setProfile(updatedProfile);
                router.push('/main');
            }
        } catch (error) {
            console.error('프로필 업데이트 실패:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteProfile = async () => {
        if (!currentProfile) return;

        try {
            const success = await deleteProfile(currentProfile.id);
            if (success) {
                setProfile(null);
                router.push('/intro');
            }
        } catch (error) {
            console.error('프로필 삭제 실패:', error);
        }
    };

    const handleCancel = () => {
        router.push('/main');
    };

    if (profileLoading) {
        return (
            <div className="page-container bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center animate-bounce">
                            <span className="text-3xl">🎨</span>
                        </div>
                        <h1 className="text-4xl font-bold text-primary mb-2 font-baloo">KidsEdu</h1>
                        <p className="text-lg text-gray-600 font-medium">로딩 중...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentProfile) {
        return null;
    }

    if (showDeleteConfirm) {
        return (
            <div className="page-container bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                <div className="flex items-center justify-center h-full p-6">
                    <div className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-2xl text-center">
                        <div className="w-16 h-16 mx-auto mb-6 bg-red-500 rounded-full flex items-center justify-center">
                            <Trash2 className="w-8 h-8 text-white" />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-4 font-baloo">프로필 삭제</h2>

                        <p className="text-gray-600 mb-6">
                            <strong>{currentProfile.nickname}</strong> 프로필을 정말 삭제하시겠습니까?
                            <br />이 작업은 되돌릴 수 없습니다.
                        </p>

                        <div className="flex gap-4">
                            <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 btn-kids bg-gray-300 text-gray-700 hover:bg-gray-400">
                                취소
                            </button>
                            <button onClick={handleDeleteProfile} className="flex-1 btn-kids bg-red-500 text-white hover:bg-red-600">
                                삭제하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
            <div className="flex flex-col h-full">
                {/* 헤더 */}
                <div className="bg-white shadow-lg border-b-2 border-gray-100 px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button onClick={handleCancel} className="p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors touch-target" aria-label="뒤로가기">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800 font-baloo">프로필 설정</h1>
                    </div>
                </div>

                {/* 프로필 수정 폼 */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-md mx-auto">
                        <ProfileForm 
                            initialData={{
                                nickname: currentProfile.nickname,
                                age: currentProfile.age,
                                thumbnail_url: currentProfile.thumbnail_url || undefined
                            }} 
                            onSubmit={handleUpdateProfile} 
                            onCancel={handleCancel} 
                            submitText={isUpdating ? '저장 중...' : '저장하기'} 
                            title="프로필 수정" 
                        />

                        {/* 프로필 삭제 버튼 */}
                        <div className="mt-8 text-center">
                            <button onClick={() => setShowDeleteConfirm(true)} className="btn-kids bg-red-500 text-white hover:bg-red-600 inline-flex items-center gap-2">
                                <Trash2 className="w-5 h-5" />
                                프로필 삭제
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
