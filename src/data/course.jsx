import img from '../assets/img/noImage.jpg'
import img1 from '../assets/img/ex1.jpg'
import img2 from '../assets/img/ex2.jpg'
import img3 from '../assets/img/ex3.jpg'
import img4 from '../assets/img/ex4.jpg'


export const course = [
    {
        id: 1,
        title: "풀스택을 위한 도커와 쿠버네티스" ,
        teacher: "최태현",
        thumbnailImage: img1,
        rating: 4.9,
        slug: "풀스택을 위한 도커와 쿠버네티스" ,
        wishes: 1,
        comments: "풀스택을 위한 도커와 쿠버네티스 입니다",
        wished: false,
        platform: '인프런',
        category: '프론트',
        userReviews: [
            {
                id: 1,
                reviewer: "김철수",
                rating: 5.0,
                content: "강의 내용이 정말 알차고 실무에 도움이 많이 됩니다!",
                timestamp: "2024-01-15 10:30:00",
                isApproved: true
            }
        ]
    },
    {
        id: 2,
        title: "2025 React 완벽 가이드 (Hooks, Redux)" ,
        teacher: "Maximilian",
        thumbnailImage: img2,
        rating: 4.8,
        slug: "2025 React 완벽 가이드 (Hooks, Redux)" ,
        wishes: 2,
        comments: "2025 React 완벽 가이드 (Hooks, Redux) 입니다",
        wished: false,
        platform: "코드잇",
        category: '백엔드',
                userReviews: [
            {
                id: 2,
                reviewer: "박영희",
                rating: 4.5,
                content: "도커와 쿠버네티스를 쉽게 이해할 수 있었어요. 다만, 몇몇 부분은 설명이 조금 더 필요할 것 같아요.",
                timestamp: "2024-01-20 14:00:00",
                isApproved: false
            },
        ]
    },
    {
        id: 3,
        title: "파이썬으로 시작하는 데이터 분석" ,
        teacher: "데이터마스터",
        thumbnailImage: img3,
        rating: 4.7,
        slug: "파이썬으로 시작하는 데이터 분석" ,
        wishes: 3,
        comments: "파이썬으로 시작하는 데이터 분석 입니다",
        wished: false,
        platform: "패스트캠퍼스",
        category: '백엔드'
    },
    {
        id: 4,
        title: "AWS 클라우드 전문가 과정" ,
        teacher: "박클라우드",
        thumbnailImage: img4,
        rating: 5,
        slug: "AWS 클라우드 전문가 과정" ,
        wishes: 3,
        comments: "AWS 클라우드 전문가 과정 입니다",
        wished: true,
        platform: "유데미",
        category: '프론트'
    }
];