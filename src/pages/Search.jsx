import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';

import CourseCard from '../components/component/CourseCard';
import SearchBar from '../components/component/SearchBar';
import Pagination from '../components/component/Pagination.jsx';
import SkeletonList from '../components/component/SkeletonCard.jsx';

import '../asserts/scss/section/_main.scss'

import { useAuth } from "../context/AuthContext";
import { handleApiError } from '../data/apierror.js'
import RecommendModal from '../components/component/RecommendModal.jsx';


const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const search_keyword = (searchParams.get("s"));
    const [course, setCourse] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [scrollLoading, setScrollLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recommend_modal, setRecommend_modal] = useState(false);

    const {logout} = useAuth();
    const page = Number(searchParams.get('page')) || 1;
    const ITEMS_PER_PAGE = 20;

    //스크롤 사이트 상단으로 올리기 
    useEffect(() => {
        setScrollLoading(true);

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        const timer = setTimeout(() => {
            setScrollLoading(false);
        }, 600);

        return () => clearTimeout(timer);
    }, [page])


    //강의 조회
    const fetchCourse = async () => {
        try {
            setError(null);

            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/search`,
                {
                    params: {
                        keyword: search_keyword,
                        page: page,
                        size: ITEMS_PER_PAGE
                    }
                }
            );
            setCourse(res.data.data.content);
            setTotalPages(res.data.data.page.totalPages);

        } catch (error) {

            handleApiError(error,{logout});
            
        }

    };

    useEffect(() => {
        fetchCourse();
    }, [search_keyword, page]);



    return (

        <section id='searchPage'>
            <div className='home__banner'>
                <img className='banner' src="/img/banner.png" alt="banner" />
            </div>
                <SearchBar />
            <div className="search__item">
                {scrollLoading
                    ?
                    <SkeletonList />
                    :
                    <div className='item__card'>
                        {course.map(course => (
                            <CourseCard course={course} key={course.id} />

                        ))}
                    </div>
                }
                <Pagination
                    currentPage={page}
                    totalPages={totalPages - 1}
                    onPageChange={(p) => {
                        const newParams = new URLSearchParams(searchParams);

                        newParams.set("page", p);

                        setSearchParams(newParams);
                    }}
                />
            </div>

        </section>


    )
}

export default Search