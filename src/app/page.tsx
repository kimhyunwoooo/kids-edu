import { redirect } from 'next/navigation';

export default function HomePage() {
    // 서버 사이드에서 직접 리다이렉트
    redirect('/intro');
}
