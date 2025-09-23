'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCurrentProfile } from '@/hooks/useCurrentProfile';
import ProgramLayout from '@/components/ProgramLayout';
import { programs } from '@/lib/programs';
import { Program } from '@/types';

export default function ProgramPage() {
    const router = useRouter();
    const params = useParams();
    const { currentProfile, loading } = useCurrentProfile();
    const [program, setProgram] = useState<Program | null>(null);

    useEffect(() => {
        if (!loading && !currentProfile) {
            router.push('/intro');
            return;
        }

        const programId = params.id as string;
        const foundProgram = programs.find(p => p.id === programId);

        if (foundProgram) {
            setProgram(foundProgram);
        } else {
            router.push('/main');
        }
    }, [params.id, currentProfile, loading, router]);

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

    if (!currentProfile || !program) {
        return null;
    }

    return (
        <ProgramLayout title={program.title} icon={program.icon} color={program.color}>
            <div className="p-6">
                {/* 프로그램 소개 */}
                <div className="text-center mb-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center text-white text-4xl shadow-xl" style={{ backgroundColor: program.color }}>
                        {program.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 font-baloo">{program.title}</h2>
                    <p className="text-lg text-gray-600 font-medium">{program.description}</p>
                </div>

                {/* 프로그램 콘텐츠 영역 */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100">
                    <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
                            <span className="text-6xl">🚧</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 font-baloo">준비 중입니다!</h3>
                        <p className="text-lg text-gray-600 font-medium mb-6">
                            이 프로그램은 현재 개발 중입니다.
                            <br />곧 만나보실 수 있어요!
                        </p>
                        <button onClick={() => router.push('/main')} className="btn-primary">
                            메인으로 돌아가기
                        </button>
                    </div>
                </div>

                {/* 추가 정보 */}
                <div className="mt-8 text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 max-w-md mx-auto">
                        <h4 className="text-lg font-bold text-gray-800 mb-2 font-baloo">💡 팁</h4>
                        <p className="text-gray-600 font-medium">다른 프로그램도 확인해보세요!</p>
                    </div>
                </div>
            </div>
        </ProgramLayout>
    );
}
