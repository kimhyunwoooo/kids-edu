'use client';

import { Profile } from '@/types';
import { User, Edit, Trash2 } from 'lucide-react';

interface ProfileCardProps {
    profile: Profile;
    onSelect?: (profile: Profile) => void;
    onEdit?: (profile: Profile) => void;
    onDelete?: (profile: Profile) => void;
    showActions?: boolean;
    isSelected?: boolean;
}

export default function ProfileCard({ profile, onSelect, onEdit, onDelete, showActions = false, isSelected = false }: ProfileCardProps) {
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
                <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">{profile.thumbnail_url ? <img src={profile.thumbnail_url} alt={profile.nickname} className="w-full h-full object-cover" /> : <User className="w-10 h-10 text-white" />}</div>

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
