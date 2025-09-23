'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProfiles } from '@/hooks/useProfiles';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import ProfileCard from '@/components/ProfileCard';
import ProfileForm from '@/components/ProfileForm';
import { Profile, CreateProfileData } from '@/types';
import { Plus, Users, ArrowRight } from 'lucide-react';

export default function IntroPage() {
    const router = useRouter();
    const { profiles, loading, createProfile, deleteProfile } = useProfiles();
    const { setProfile } = useCurrentProfile();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

    const handleProfileSelect = (profile: Profile) => {
        setProfile(profile);
        router.push('/main');
    };

    const handleCreateProfile = async (data: CreateProfileData) => {
        const newProfile = await createProfile(data);
        if (newProfile) {
            setShowCreateForm(false);
            // 새로 생성된 프로필을 자동으로 선택
            setProfile(newProfile);
            router.push('/main');
        }
    };

    const handleEditProfile = (profile: Profile) => {
        setEditingProfile(profile);
    };

    const handleUpdateProfile = async (data: CreateProfileData) => {
        if (editingProfile) {
            // TODO: 프로필 업데이트 로직 구현
            setEditingProfile(null);
        }
    };

    const handleDeleteProfile = async (profile: Profile) => {
        if (confirm(`${profile.nickname} 프로필을 삭제하시겠습니까?`)) {
            await deleteProfile(profile.id);
        }
    };

    if (showCreateForm) {
        return (
            <div className="page-container bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                <div className="flex items-center justify-center h-full p-6">
                    <ProfileForm onSubmit={handleCreateProfile} onCancel={() => setShowCreateForm(false)} submitText="프로필 만들기" title="새 프로필 만들기" />
                </div>
            </div>
        );
    }

    if (editingProfile) {
        return (
            <div className="page-container bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                <div className="flex items-center justify-center h-full p-6">
                    <ProfileForm initialData={editingProfile} onSubmit={handleUpdateProfile} onCancel={() => setEditingProfile(null)} submitText="수정하기" title="프로필 수정" />
                </div>
            </div>
        );
    }

    return (
        <div className="page-container bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
            <div className="flex flex-col h-full p-6">
                {/* 헤더 */}
                <div className="text-center mb-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-4xl">🎨</span>
                    </div>
                    <h1 className="text-4xl font-bold text-primary mb-2 font-baloo">KidsEdu</h1>
                    <p className="text-lg text-gray-600 font-medium">프로필을 선택하거나 새로 만들어보세요!</p>
                </div>

                {/* 프로필 목록 */}
                <div className="flex-1 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full animate-pulse"></div>
                                <p className="text-lg text-gray-600">프로필을 불러오는 중...</p>
                            </div>
                        </div>
                    ) : profiles.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                <p className="text-lg text-gray-600 mb-6">아직 프로필이 없어요</p>
                                <button onClick={() => setShowCreateForm(true)} className="btn-primary">
                                    첫 프로필 만들기
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-center text-gray-800 font-baloo">프로필 선택</h2>

                            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                                {profiles.map(profile => (
                                    <ProfileCard key={profile.id} profile={profile} onSelect={handleProfileSelect} onEdit={handleEditProfile} onDelete={handleDeleteProfile} showActions={true} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 새 프로필 만들기 버튼 */}
                {profiles.length > 0 && (
                    <div className="text-center pt-6">
                        <button onClick={() => setShowCreateForm(true)} className="btn-secondary inline-flex items-center gap-2">
                            <Plus className="w-6 h-6" />새 프로필 만들기
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
