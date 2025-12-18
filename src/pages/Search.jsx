import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import CourseItem from '../components/component/CourseItem';
import SearchBar from '../components/component/SearchBar';

import '../assets/scss/section/_main.scss'

import { course } from '../data/course';


const Search = () => {
    const { searchKeyword } = useParams();
    // const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // const fetchCourse = async () => {
    //     try {
    //         setError(null);
    //         setUsers(null);
    //         setLoading(true);

    //         const res = await axios.get(
    //             'https://jsonplaceholder.typicode.com/users'
    //         );
    //         setCourse(res.data);
    //     } catch (e) {
    //         setError(e);
    //     }
    //     setLoading(false);
    // };

    // useEffect(() => {
    //     fetchCourse();
    // }, [searchKeyword]);

    console.log(searchKeyword)

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;


    return (

        <section id='searchPage'>
            <div className='home__banner'>
                <img className='banner' src="/img/banner.png" alt="banner" />
            </div>
            <div className='search-bar'>
                <SearchBar />
                <button className='recommand-btn'>✨ 강의 추천받기</button>
            </div>
            <div className="search__item">
                <div className='item__card'>
                    {course.map(course => (
                        <CourseItem  course={course} key={course.id}/>
                    ))}
                </div>
            </div>
        </section>


    )
}

export default Search