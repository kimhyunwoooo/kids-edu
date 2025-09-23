import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'KidsEdu - 키즈 교육 플랫폼',
    description: '5-10세 아동을 위한 태블릿 최적화 교육 웹 서비스',
    manifest: '/manifest.json',
    icons: {
        icon: '/favicon.ico',
        apple: '/icon.svg'
    }
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#FFB703'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className="h-full w-full">
            <head>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="KidsEdu" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="format-detection" content="telephone=no" />
            </head>
            <body className="h-full w-full overflow-hidden">
                <div id="__next" className="h-full w-full">
                    {children}
                </div>
            </body>
        </html>
    );
}
