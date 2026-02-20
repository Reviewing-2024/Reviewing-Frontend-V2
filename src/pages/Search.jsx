import React, { useState } from 'react'
import { useSearchParams  } from 'react-router-dom'

import CourseCard from '../components/component/CourseCard';
import SearchBar from '../components/component/SearchBar';

import '../asserts/scss/section/_main.scss'

import { course } from '../data/course';


const Search = () => {
     const [searchParams] = useSearchParams();
      const search_keyword = (searchParams.get("s"));
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

    // if (loading) return <div>로딩중..</div>;
    // if (error) return <div>에러가 발생했습니다</div>;


    let search_courses = course.filter(function(x){
            return x.title.includes(search_keyword)
          });


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
                    {search_courses.map((course) => (
                        <CourseCard  course={course} key={course.id}/>
                    ))}
                </div>
            </div>
        </section>


    )
}

export default Search