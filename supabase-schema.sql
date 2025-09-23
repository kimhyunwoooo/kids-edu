-- KidsEdu 프로젝트 Supabase 데이터베이스 스키마

-- 프로필 테이블 생성
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nickname VARCHAR(20) NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 5 AND age <= 10),
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles(created_at);

-- RLS (Row Level Security) 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 프로필을 읽을 수 있도록 정책 설정
CREATE POLICY "프로필 읽기 허용" ON profiles
  FOR SELECT USING (true);

-- 모든 사용자가 프로필을 생성할 수 있도록 정책 설정
CREATE POLICY "프로필 생성 허용" ON profiles
  FOR INSERT WITH CHECK (true);

-- 모든 사용자가 프로필을 수정할 수 있도록 정책 설정
CREATE POLICY "프로필 수정 허용" ON profiles
  FOR UPDATE USING (true);

-- 모든 사용자가 프로필을 삭제할 수 있도록 정책 설정
CREATE POLICY "프로필 삭제 허용" ON profiles
  FOR DELETE USING (true);

-- updated_at 자동 업데이트를 위한 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 프로필 테이블에 트리거 적용
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Storage 버킷 생성 (프로필 이미지용)
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage 정책 설정
CREATE POLICY "프로필 이미지 읽기 허용" ON storage.objects
  FOR SELECT USING (bucket_id = 'profile-images');

CREATE POLICY "프로필 이미지 업로드 허용" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'profile-images');

CREATE POLICY "프로필 이미지 수정 허용" ON storage.objects
  FOR UPDATE USING (bucket_id = 'profile-images');

CREATE POLICY "프로필 이미지 삭제 허용" ON storage.objects
  FOR DELETE USING (bucket_id = 'profile-images');
