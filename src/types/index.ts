export interface Profile {
    id: string;
    nickname: string;
    age: number;
    thumbnail_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface CreateProfileData {
    nickname: string;
    age: number;
    thumbnail_url?: string;
}

export interface UpdateProfileData {
    nickname?: string;
    age?: number;
    thumbnail_url?: string;
}

export interface Program {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    route: string;
}

export interface NavigationItem {
    label: string;
    href: string;
    icon?: string;
}
