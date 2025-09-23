import { Program } from '@/types';

export const programs: Program[] = [
    {
        id: 'drawing',
        title: '그림 그리기',
        description: '자유롭게 그림을 그려보세요!',
        icon: '🎨',
        color: '#FFB703',
        route: '/programs/drawing'
    },
    {
        id: 'tracing',
        title: '글씨 따라쓰기',
        description: '글자를 따라 써보세요!',
        icon: '✏️',
        color: '#8ECAE6',
        route: '/programs/tracing'
    },
    {
        id: 'puzzle',
        title: '퍼즐 맞추기',
        description: '재미있는 퍼즐을 맞춰보세요!',
        icon: '🧩',
        color: '#FB8500',
        route: '/programs/puzzle'
    },
    {
        id: 'quiz',
        title: '퀴즈 놀이',
        description: '재미있는 퀴즈를 풀어보세요!',
        icon: '❓',
        color: '#90BE6D',
        route: '/programs/quiz'
    },
    {
        id: 'music',
        title: '음악 놀이',
        description: '음악과 함께 놀아보세요!',
        icon: '🎵',
        color: '#E76F51',
        route: '/programs/music'
    },
    {
        id: 'story',
        title: '동화 읽기',
        description: '재미있는 동화를 읽어보세요!',
        icon: '📚',
        color: '#9B59B6',
        route: '/programs/story'
    }
];
