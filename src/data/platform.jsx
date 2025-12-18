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
        src: "/인프런/all",
        color: "#00c471"
    },
    {
        title: "패스트캠퍼스",
        icon: <SiDota2 />,
        src: "/패스트캠퍼스",
        color: "#D4003A"
    },
    {
        title: "코드잇",
        icon: <BsCCircleFill />,
        src: "/코드잇",
        color: "#93f"
    },
    {
        title: "노마드코더",
        icon: <SiNuxtdotjs />,
        src: "/노마드코더",
        color: "#E0B800"
    },
    {
        title: "유데미",
        icon: <SiUdemy />,
        src: "/유데미",
        color: "#A435F0"
    },
    {
        title: "K-MOOC",
        icon: <IoInfiniteSharp />,
        src: "/K-MOOC",
        color: "#009488"
    },
    // {
    //     title: "생활코딩",
    //     icon:  <BsCCircleFill />,
    //     src: "/spartacoding",
    //     color: "#666" 
    // }
];

export const category = [
    {
        title: "전체 카테고리",
        src: "/인프런/전체 카테고리"
    },
    {
        title: "프론트",
        src: "/인프런/프론트"
    },
]