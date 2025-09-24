'use client';

import { useEffect, useState } from 'react';
import { Profile } from '@/types';
import { User, Edit, Trash2 } from 'lucide-react';
import { getSafeImageUrl } from '@/lib/storage';
import { debugImageLoading, debugProfileImages } from '@/lib/debug';

interface ProfileCardProps {
    profile: Profile;
    onSelect?: (profile: Profile) => void;
    onEdit?: (profile: Profile) => void;
    onDelete?: (profile: Profile) => void;
    showActions?: boolean;
    isSelected?: boolean;
}

export default function ProfileCard({ profile, onSelect, onEdit, onDelete, showActions = false, isSelected = false }: ProfileCardProps) {
    // 안전한 이미지 URL 가져오기
    const safeImageUrl = getSafeImageUrl(profile.thumbnail_url);

    // 이미지 로딩 상태 관리
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    // 개발 환경에서 프로필 데이터 검증
    if (process.env.NODE_ENV === 'development') {
        debugProfileImages.validateProfileData(profile);
    }

    // 이미지 URL 변경 감지 및 로깅
    useEffect(() => {
        console.log('ProfileCard - 이미지 URL 변경 감지:', {
            profileId: profile.id,
            profileNickname: profile.nickname,
            originalUrl: profile.thumbnail_url,
            safeUrl: safeImageUrl,
            hasImage: !!safeImageUrl
        });

        // 이미지 URL이 변경되면 로딩 상태 초기화
        setImageLoading(true);
        setImageError(false);
    }, [profile.thumbnail_url, safeImageUrl, profile.id, profile.nickname]);

    const handleClick = () => {
        if (onSelect) {
            onSelect(profile);
        }
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onEdit) {
            onEdit(profile);
        }
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDelete) {
            onDelete(profile);
        }
    };

    return (
        <div className={`card-kids p-6 cursor-pointer transition-all duration-300 ${isSelected ? 'ring-4 ring-primary ring-opacity-50 scale-105' : ''}`} onClick={handleClick}>
            <div className="flex flex-col items-center text-center">
                {/* 프로필 이미지 */}
                <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                    {safeImageUrl && !imageError ? (
                        <>
                            {imageLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                            <img
                                src={safeImageUrl}
                                alt={profile.nickname}
                                className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                                key={`${profile.id}-${profile.updated_at || profile.created_at}-${safeImageUrl}`}
                                onError={() => {
                                    debugImageLoading.logImageLoad(safeImageUrl, false, `ProfileCard-${profile.nickname}`);
                                    console.error('ProfileCard 이미지 로드 실패:', {
                                        originalUrl: profile.thumbnail_url,
                                        safeUrl: safeImageUrl,
                                        profileId: profile.id,
                                        profileNickname: profile.nickname,
                                        updatedAt: profile.updated_at
                                    });
                                    setImageError(true);
                                    setImageLoading(false);
                                }}
                                onLoad={() => {
                                    debugImageLoading.logImageLoad(safeImageUrl, true, `ProfileCard-${profile.nickname}`);
                                    console.log('ProfileCard 이미지 로드 성공:', {
                                        originalUrl: profile.thumbnail_url,
                                        safeUrl: safeImageUrl,
                                        profileId: profile.id,
                                        profileNickname: profile.nickname,
                                        updatedAt: profile.updated_at
                                    });
                                    setImageLoading(false);
                                    setImageError(false);
                                }}
                            />
                        </>
                    ) : (
                        <User className="w-10 h-10 text-white" />
                    )}
                </div>

                {/* 프로필 정보 */}
                <h3 className="text-xl font-bold text-gray-800 mb-1 font-baloo">{profile.nickname}</h3>
                <p className="text-gray-600 font-medium">{profile.age}세</p>

                {/* 액션 버튼들 */}
                {showActions && (
                    <div className="flex gap-2 mt-4">
                        <button onClick={handleEdit} className="p-2 bg-secondary text-white rounded-full hover:bg-blue-500 transition-colors touch-target" aria-label="프로필 수정">
                            <Edit className="w-5 h-5" />
                        </button>
                        <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors touch-target" aria-label="프로필 삭제">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
