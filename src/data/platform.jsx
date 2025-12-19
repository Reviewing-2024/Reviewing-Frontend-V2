import { IoLeaf } from "react-icons/io5";
import { BsCCircleFill } from "react-icons/bs";
import { SiUdemy } from "react-icons/si";
import { IoInfiniteSharp } from "react-icons/io5";
import { SiDota2 } from "react-icons/si";
import { SiNuxtdotjs } from "react-icons/si";

export const platforms = [
    {
        title: "인프런",
        icon: <IoLeaf />,
        src: "/인프런",
    },
    {
        title: "패스트캠퍼스",
        icon: <SiDota2 />,
        src: "/패스트캠퍼스",
    },
    {
        title: "코드잇",
        icon: <BsCCircleFill />,
        src: "/코드잇",
    },
    {
        title: "노마드코더",
        icon: <SiNuxtdotjs />,
        src: "/노마드코더",
    },
    {
        title: "유데미",
        icon: <SiUdemy />,
        src: "/유데미",
    },
    {
        title: "K-MOOC",
        icon: <IoInfiniteSharp />,
        src: "/K-MOOC",
    },
    // {
    //     title: "생활코딩",
    //     icon:  <BsCCircleFill />,
    //     src: "/spartacoding",
    //     color: "#666" 
    // }
];

export const categorys = [
    {
        title: "프론트",
        src: "/프론트"
    },
    {
        title: "백엔드",
        src: "/백엔드"
    },
]