'use client';

import { useState } from 'react';
import { CreateProfileData, UpdateProfileData } from '@/types';
import { Upload, User, Calendar, Loader2 } from 'lucide-react';
import { uploadImage } from '@/lib/storage';

interface ProfileFormProps {
    initialData?: Partial<CreateProfileData>;
    onSubmit: (data: CreateProfileData | UpdateProfileData) => void;
    onCancel: () => void;
    submitText?: string;
    title?: string;
}

export default function ProfileForm({ initialData = {}, onSubmit, onCancel, submitText = '생성하기', title = '새 프로필 만들기' }: ProfileFormProps) {
    const [formData, setFormData] = useState({
        nickname: initialData.nickname || '',
        age: initialData.age || 5,
        thumbnail_url: initialData.thumbnail_url || ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isUploading, setIsUploading] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.nickname.trim()) {
            newErrors.nickname = '닉네임을 입력해주세요';
        } else if (formData.nickname.length > 20) {
            newErrors.nickname = '닉네임은 20자 이하로 입력해주세요';
        }

        if (formData.age < 5 || formData.age > 10) {
            newErrors.age = '나이는 5세부터 10세까지 선택할 수 있습니다';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 파일 크기 체크 (5MB 제한)
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, thumbnail: '파일 크기는 5MB 이하로 제한됩니다' }));
            return;
        }

        // 파일 타입 체크
        if (!file.type.startsWith('image/')) {
            setErrors(prev => ({ ...prev, thumbnail: '이미지 파일만 업로드 가능합니다' }));
            return;
        }

        setIsUploading(true);
        setErrors(prev => ({ ...prev, thumbnail: '' }));

        try {
            // Supabase Storage에 업로드
            const result = await uploadImage(file);
            setFormData(prev => ({ ...prev, thumbnail_url: result.url }));
        } catch (error) {
            setErrors(prev => ({ ...prev, thumbnail: '파일 업로드에 실패했습니다' }));
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-2xl">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 font-baloo">{title}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 프로필 이미지 업로드 */}
                <div className="text-center">
                    <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden mb-4">{formData.thumbnail_url ? <img src={formData.thumbnail_url} alt="프로필 미리보기" className="w-full h-full object-cover" /> : <User className="w-12 h-12 text-white" />}</div>
                        <label className={`absolute bottom-0 right-0 bg-secondary text-white rounded-full p-2 cursor-pointer hover:bg-blue-500 transition-colors touch-target ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
                        </label>
                    </div>
                    {errors.thumbnail && <p className="text-red-500 text-sm mt-2">{errors.thumbnail}</p>}
                </div>

                {/* 닉네임 입력 */}
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">닉네임</label>
                    <input type="text" value={formData.nickname} onChange={e => setFormData(prev => ({ ...prev, nickname: e.target.value }))} className="input-kids" placeholder="예: 민수" maxLength={20} />
                    {errors.nickname && <p className="text-red-500 text-sm mt-2">{errors.nickname}</p>}
                </div>

                {/* 나이 선택 */}
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">나이</label>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select value={formData.age} onChange={e => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))} className="input-kids pl-12 appearance-none">
                            {[5, 6, 7, 8, 9, 10].map(age => (
                                <option key={age} value={age}>
                                    {age}세
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.age && <p className="text-red-500 text-sm mt-2">{errors.age}</p>}
                </div>

                {/* 버튼들 */}
                <div className="flex gap-4 pt-4">
                    <button type="button" onClick={onCancel} className="flex-1 btn-kids bg-gray-300 text-gray-700 hover:bg-gray-400">
                        취소
                    </button>
                    <button type="submit" className="flex-1 btn-primary">
                        {submitText}
                    </button>
                </div>
            </form>
        </div>
    );
}
