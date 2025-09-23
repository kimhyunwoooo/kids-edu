'use client';

import { Program } from '@/types';
import { ArrowRight } from 'lucide-react';

interface ProgramCardProps {
    program: Program;
    onClick: (program: Program) => void;
}

export default function ProgramCard({ program, onClick }: ProgramCardProps) {
    return (
        <div className="card-kids p-6 cursor-pointer group" onClick={() => onClick(program)}>
            <div className="flex flex-col items-center text-center">
                {/* 프로그램 아이콘 */}
                <div className="w-20 h-20 mb-4 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg" style={{ backgroundColor: program.color }}>
                    {program.icon}
                </div>

                {/* 프로그램 정보 */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-baloo">{program.title}</h3>
                <p className="text-gray-600 font-medium text-sm mb-4">{program.description}</p>

                {/* 시작 버튼 */}
                <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-200">
                    <span>시작하기</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
            </div>
        </div>
    );
}
