import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { RiArrowDropDownLine } from "react-icons/ri";

import '../asserts/scss/section/_main.scss'

import SearchBar from '../components/component/SearchBar';
import CourseCard from '../components/component/CourseCard';
import Pagination from '../components/component/Pagination';
import SkeletonList from '../components/component/SkeletonCard.jsx'

import { useAuth } from "../context/AuthContext";
import { main_Sort_Category } from '../data/platform.js';
import { handleApiError } from '../data/apierror.js'


const Home = () => {
  const params = useParams();
  const {logout} = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef(null);

  const [courses, setCourses] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [platform, setPlatform] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [error, setError] = useState(null);
  const [current_category, setCurrent_category] = useState( {title: "추천순", sort: 'createdAt'});
  const [sort_category_open, setSort_category_open] = useState(false);
  
  const page = Number(searchParams.get('page')) || 1;
  const ITEMS_PER_PAGE = 12;

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

    //플랫폼, 카테고리 선택시 스켈레톤ui 
    useEffect(() => {
    setScrollLoading(true);

      const timer = setTimeout(() => {
        setScrollLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }, [platform, category, subCategory, current_category])
  
  //플랫폼 및 카테고리 헤더 선택 영역
  const platformTitle = platform.map(p => p.englishName);
  const categoryTitle = category.map(c => c.slug);
  const subCategoryTitle = subCategory.map(s => s.slug)

  const selectedPlatform =
    params.platform && platformTitle.includes(params.platform)
      ? params.platform
      : null;

  const selectedCategory =
    params.category
      ? params.category
      : params.platform && categoryTitle.includes(params.platform)
        ? params.platform
        : null;


  const selectedSubCategory =
    searchParams.getAll('sub')
    .filter(sub => subCategoryTitle.includes(sub));



  //platform 요청

  useEffect(() => {
    const fetchplatform = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/platforms`
        );
        setPlatform(res.data.data);

      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchplatform();

  }, []);


  //selectedPlatform가 있을시 category요청

  useEffect(() => {
    if (!selectedPlatform) {
      setCategory([]);
      setSubCategory([])
      return;
    }

    const fetchcategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/categories`,
          {
            params: {
              platformName: selectedPlatform
            }
          }
        );

        setCategory(res.data.data);

      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchcategory();

  }, [selectedPlatform]);

  //selectedCategory가 있을시 subcategory 요청

  useEffect(() => {
    if (!selectedPlatform || !selectedCategory) {
      setSubCategory([]);
      return;
    }

    const fetchsubcategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/subcategories`,
          {
            params: {
              platformName: selectedPlatform,
              ...(selectedCategory && { categorySlug: selectedCategory })
            }
          }
        );

        const filterRes = res.data.data.filter(
          (sub) => sub.slug !== selectedCategory
        )

        setSubCategory(filterRes);

      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchsubcategory();

  }, [selectedPlatform, selectedCategory]);


  //강의 요청
  useEffect(() => {

    const fetchCourses = async () => {

      try {

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/courses`, {
          params: {
            ...(selectedPlatform && { platform: selectedPlatform }),
            ...(selectedCategory && { category: selectedCategory }),
            ...(selectedSubCategory.length > 0 && { subCategories: selectedSubCategory }),
            sort: current_category.sort,
            page: page,
            size: ITEMS_PER_PAGE,
          }
        });

        setCourses(response.data.data.content);
        setTotalItems(response.data.data.page.totalElements);
        setTotalPages(response.data.data.page.totalPages);
      } catch (error) {
        
        handleApiError(error,{logout});
      }

    };

    fetchCourses();

  }, [page, ITEMS_PER_PAGE, selectedPlatform, selectedCategory, selectedSubCategory, current_category]);


  //서브 카테고리 다중선택 토글
  const handleSubToggle = (slug) => {
  const prev = searchParams.getAll("sub");

  let next;

  if (prev.includes(slug)) {
    next = prev.filter(s => s !== slug);
  } else {
    next = [...prev, slug];
  }

  const params = new URLSearchParams(searchParams);
  params.delete("sub");

  next.forEach(s => params.append("sub", s));

  setSearchParams(params);
};

  if (error) return <div>에러가 발생했습니다</div>;



  return (
    <div id='home' role='home'>
      <div className='home__banner'>
        <img className='banner' src="/img/banner.png" alt="banner" />
      </div>
      <div className='search-bar'>
        <SearchBar />
        <button className='recommand-btn' >✨ 강의 추천받기</button>
      </div>
      <nav className='home__platform'>
        <ul className='platform_container'>
          <li>
            <Link
              to={'/'}
              className={!selectedPlatform ? 'active' : ''}
            >
              전체 플랫폼
            </Link>
          </li>
          {platform.map((platform, key) => (
            <li key={key}>
              <Link
                to={`/${platform.englishName}`}
                className={selectedPlatform === platform.englishName ? 'active' : ''}
              >
                {platform.koreanName}
              </Link>
            </li>
          ))}
        </ul>
        {selectedPlatform && (
          <ul className='category_container'>
            <li>
              <Link
                to={selectedPlatform ? `/${selectedPlatform}` : `/`}
                className={!selectedCategory ? 'active' : ''}
              >
                전체 카테고리
              </Link>
            </li>
            {loading ? (
              <li> </li>
            ) : (category.map((category, key) => (
              <li key={key}>
                <Link
                  to={selectedPlatform ? `/${selectedPlatform}/${category.slug}` : `${category.slug}`}
                  className={selectedCategory === category.slug ? 'active' : (params.platform === category.slug ? 'active' : '')}
                >
                  {category.name}
                </Link>
              </li>
            ))
            )}
          </ul>
        )}

        {selectedCategory && (
          <ul className='sub_category_container'>
            <li>
              <Link
                to={selectedCategory ? `/${selectedPlatform}/${selectedCategory}` : `/`}
                className={selectedSubCategory.length === 0 ? 'active' : ''}
              >
                전체
              </Link>
            </li>
            {loading ? (
              <li> </li>
            ) : (subCategory.map((subCategory, key) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => handleSubToggle(subCategory.slug)}
                  className={
                    selectedSubCategory.includes(subCategory.slug)
                      ? "active" : ""
                  }
                >
                  {subCategory.name}
                </button>
              </li>
            ))
            )}
          </ul>
        )}
      </nav>
      <div className='home__item'>
        <div className="sort-category-dropdown" ref={dropdownRef}>
          <button
            className="dropdown-button"
            onClick={() => setSort_category_open(!sort_category_open)}
          >
            {current_category.title}
            <RiArrowDropDownLine />
          </button>

          {sort_category_open && (
            <ul className="dropdown-menu">
              {main_Sort_Category.map((sort_category) => (
                <li
                  key={sort_category.sort}
                  onClick={() => {
                    setCurrent_category(sort_category);
                    setSort_category_open(false);
                  }}
                  className={`home-dropdown__item ${
                    current_category.sort === sort_category.sort ? "active" : ""
                  }`}
                >
                  {sort_category.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        {scrollLoading
          ? 
          <SkeletonList /> 
          : 
          <div className='item__card'>
            {courses.map(course => (
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
    </div>
  )
}

export default Home