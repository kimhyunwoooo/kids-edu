'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';

export default function HomePage() {
    const router = useRouter();
    const { currentProfile, loading } = useCurrentProfile();

    useEffect(() => {
        if (!loading) {
            if (currentProfile) {
                // 프로필이 있으면 메인 화면으로
                router.push('/main');
            } else {
                // 프로필이 없으면 프로필 선택 화면으로
                router.push('/intro');
            }
        }
    }, [currentProfile, loading, router]);

    // 로딩 화면
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
