'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import { ArrowLeft, User } from 'lucide-react';

interface ProgramLayoutProps {
    children: ReactNode;
    title: string;
    icon: string;
    color: string;
}

export default function ProgramLayout({ children, title, icon, color }: ProgramLayoutProps) {
    const router = useRouter();
    const { currentProfile } = useCurrentProfile();

    const handleBack = () => {
        router.push('/main');
    };

    return (
        <div className="page-container bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
            {/* 헤더 */}
            <div className="bg-white shadow-lg border-b-2 border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={handleBack} className="p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors touch-target" aria-label="뒤로가기">
                            <ArrowLeft className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl shadow-lg" style={{ backgroundColor: color }}>
                                {icon}
                            </div>
                            <h1 className="text-xl font-bold text-gray-800 font-baloo">{title}</h1>
                        </div>
                    </div>

                    {/* 프로필 정보 */}
                    {currentProfile && (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">{currentProfile.thumbnail_url ? <img src={currentProfile.thumbnail_url} alt={currentProfile.nickname} className="w-full h-full object-cover" /> : <User className="w-5 h-5 text-white" />}</div>
                            <span className="text-sm font-medium text-gray-700">{currentProfile.nickname}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="content-area">{children}</div>
        </div>
    );
}
