'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Profile, CreateProfileData, UpdateProfileData } from '@/types';

export function useProfiles() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfiles = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });

            if (error) throw error;
            setProfiles(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : '프로필을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const createProfile = async (profileData: CreateProfileData): Promise<Profile | null> => {
        try {
            const { data, error } = await supabase.from('profiles').insert([profileData]).select().single();

            if (error) throw error;

            setProfiles(prev => [data, ...prev]);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : '프로필 생성에 실패했습니다.');
            return null;
        }
    };

    const updateProfile = async (id: string, updates: UpdateProfileData): Promise<Profile | null> => {
        try {
            console.log('useProfiles - 프로필 업데이트 시작:', { id, updates });

            const { data, error } = await supabase
                .from('profiles')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('useProfiles - Supabase 업데이트 오류:', error);
                throw error;
            }

            console.log('useProfiles - Supabase 업데이트 성공:', data);
            console.log('useProfiles - 업데이트된 프로필 데이터:', {
                id: data.id,
                nickname: data.nickname,
                age: data.age,
                thumbnail_url: data.thumbnail_url,
                updated_at: data.updated_at
            });

            // 프로필 목록 업데이트
            setProfiles(prev => {
                const updatedProfiles = prev.map(profile => (profile.id === id ? data : profile));
                console.log(
                    'useProfiles - 프로필 목록 업데이트 완료:',
                    updatedProfiles.map(p => ({ id: p.id, nickname: p.nickname, thumbnail_url: p.thumbnail_url }))
                );
                return updatedProfiles;
            });

            return data;
        } catch (err) {
            console.error('useProfiles - 프로필 업데이트 실패:', err);
            setError(err instanceof Error ? err.message : '프로필 수정에 실패했습니다.');
            return null;
        }
    };

    const deleteProfile = async (id: string): Promise<boolean> => {
        try {
            const { error } = await supabase.from('profiles').delete().eq('id', id);

            if (error) throw error;

            setProfiles(prev => prev.filter(profile => profile.id !== id));
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : '프로필 삭제에 실패했습니다.');
            return false;
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    return {
        profiles,
        loading,
        error,
        createProfile,
        updateProfile,
        deleteProfile,
        refetch: fetchProfiles
    };
}
