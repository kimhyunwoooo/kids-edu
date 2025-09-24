'use client';

import { Profile } from '@/types';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { useRouter } from 'next/navigation';
import { User, Settings, LogOut } from 'lucide-react';

interface GNBProps {
    currentProfile: Profile;
}

export default function GNB({ currentProfile }: GNBProps) {
    const router = useRouter();
    const { clearProfile } = useCurrentProfile();

    const handleProfileSwitch = () => {
        router.push('/intro');
    };

    const handleSettings = () => {
        router.push('/profile-settings');
    };

    const handleLogout = () => {
        clearProfile();
        router.push('/intro');
    };

    return (
        <nav className="bg-white shadow-lg border-b-2 border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* 프로필 정보 */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                        {currentProfile.thumbnail_url ? (
                            <img
                                src={currentProfile.thumbnail_url}
                                alt={currentProfile.nickname}
                                className="w-full h-full object-cover"
                                key={currentProfile.thumbnail_url}
                                onError={e => {
                                    console.error('GNB 이미지 로드 실패:', currentProfile.thumbnail_url);
                                    e.currentTarget.style.display = 'none';
                                }}
                                onLoad={() => {
                                    console.log('GNB 이미지 로드 성공:', currentProfile.thumbnail_url);
                                }}
                            />
                        ) : (
                            <User className="w-6 h-6 text-white" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 font-baloo">{currentProfile.nickname}</h2>
                        <p className="text-sm text-gray-600">{currentProfile.age}세</p>
                    </div>
                </div>

                {/* 액션 버튼들 */}
                <div className="flex items-center gap-2">
                    <button onClick={handleProfileSwitch} className="p-3 bg-secondary text-white rounded-full hover:bg-blue-500 transition-colors touch-target" aria-label="프로필 변경">
                        <User className="w-5 h-5" />
                    </button>

                    <button onClick={handleSettings} className="p-3 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors touch-target" aria-label="설정">
                        <Settings className="w-5 h-5" />
                    </button>

                    <button onClick={handleLogout} className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors touch-target" aria-label="로그아웃">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
