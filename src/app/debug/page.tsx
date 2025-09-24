'use client';

import { useState } from 'react';
import { debugImageLoading } from '@/lib/debug';

export default function DebugPage() {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const checkSystemStatus = async () => {
        setLoading(true);
        try {
            const result = await debugImageLoading.checkSystemStatus();
            setStatus(result);
        } catch (error) {
            console.error('시스템 상태 확인 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">시스템 디버깅</h1>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">시스템 상태 확인</h2>
                    <button onClick={checkSystemStatus} disabled={loading} className="btn-primary mb-4">
                        {loading ? '확인 중...' : '시스템 상태 확인'}
                    </button>

                    {status && (
                        <div className="space-y-2">
                            <div className={`p-3 rounded ${status.environment ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>환경 변수: {status.environment ? '✅ 정상' : '❌ 문제 있음'}</div>
                            <div className={`p-3 rounded ${status.supabase ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>Supabase 연결: {status.supabase ? '✅ 정상' : '❌ 문제 있음'}</div>
                            <div className={`p-3 rounded ${status.storage ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>Storage 버킷: {status.storage ? '✅ 정상' : '❌ 문제 있음'}</div>
                            <div className={`p-3 rounded font-semibold ${status.overall ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>전체 상태: {status.overall ? '✅ 모든 시스템 정상' : '❌ 일부 시스템에 문제가 있습니다'}</div>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">프로필 이미지 문제 해결 가이드</h2>
                    <div className="space-y-4 text-sm">
                        <div>
                            <h3 className="font-semibold text-gray-800">1. 환경 변수 확인</h3>
                            <p className="text-gray-600">.env.local 파일에 올바른 Supabase URL과 키가 설정되어 있는지 확인하세요.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">2. Supabase Storage 설정</h3>
                            <p className="text-gray-600">Supabase 대시보드에서 'profile-images' 버킷이 생성되고 공개 정책이 설정되어 있는지 확인하세요.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">3. 브라우저 콘솔 확인</h3>
                            <p className="text-gray-600">개발자 도구 콘솔에서 이미지 로딩 관련 오류 메시지를 확인하세요.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">4. 네트워크 탭 확인</h3>
                            <p className="text-gray-600">개발자 도구 네트워크 탭에서 이미지 요청이 실패하는지 확인하세요.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
