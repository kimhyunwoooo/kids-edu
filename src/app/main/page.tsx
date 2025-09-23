'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import GNB from '@/components/GNB';
import ProgramCard from '@/components/ProgramCard';
import { programs } from '@/lib/programs';
import { Program } from '@/types';
import { Sparkles } from 'lucide-react';

export default function MainPage() {
    const router = useRouter();
    const { currentProfile, loading } = useCurrentProfile();

    useEffect(() => {
        if (!loading && !currentProfile) {
            router.push('/intro');
        }
    }, [currentProfile, loading, router]);

    const handleProgramClick = (program: Program) => {
        router.push(program.route);
    };

    if (loading) {
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

    return (
        <div className="page-container bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
            {/* GNB */}
            <GNB currentProfile={currentProfile} />

            {/* 메인 콘텐츠 */}
            <div className="content-area p-6">
                {/* 환영 메시지 */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-8 h-8 text-primary" />
                        <h1 className="text-3xl font-bold text-gray-800 font-baloo">안녕하세요, {currentProfile.nickname}님!</h1>
                        <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-lg text-gray-600 font-medium">오늘은 어떤 놀이를 해볼까요?</p>
                </div>

                {/* 프로그램 그리드 */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {programs.map(program => (
                        <ProgramCard key={program.id} program={program} onClick={handleProgramClick} />
                    ))}
                </div>

                {/* 추가 프로그램 안내 */}
                <div className="text-center mt-12">
                    <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 max-w-md mx-auto">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                            <span className="text-2xl">🚀</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-baloo">더 많은 프로그램이 곧 나와요!</h3>
                        <p className="text-gray-600 font-medium">새로운 교육 프로그램을 준비 중입니다</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
