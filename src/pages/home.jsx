import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import '../asserts/scss/section/_main.scss'

import SearchBar from '../components/component/SearchBar';
import CourseCard from '../components/component/CourseCard';
import Pagination from '../components/component/Pagination';



const Home = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [courses, setCourses] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [platform, setPlatform] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const page = searchParams.get('page') || 1;
  const ITEMS_PER_PAGE = 12;

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
    searchParams.get("sub") && subCategoryTitle.includes(searchParams.get("sub"))
      ? searchParams.get("sub")
      : null;



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

        setSubCategory(res.data.data);

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
          ...(selectedSubCategory && { subCategories: selectedSubCategory }),
          sort: 'createdAt',
          page: page,
          size: ITEMS_PER_PAGE,
        }
        });

        setCourses(response.data.data.content);
        setTotalItems(response.data.data.page.totalElements);
      } catch (error) {
        console.error("강의 불러오기 실패:", error);
      }

    };

    fetchCourses();

  }, [page, ITEMS_PER_PAGE, selectedPlatform, selectedCategory, selectedSubCategory]);

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
              <li>카테고리 불러오는 중...</li>
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
                className={!selectedSubCategory ? 'active' : ''}
              >
                전체
              </Link>
            </li>
            {loading ? (
              <li>서브카테고리 불러오는 중...</li>
            ) : (subCategory.map((subCategory, key) => (
              <li key={key}>
                <Link
                  to={`?sub=${subCategory.slug}`}
                  className={selectedSubCategory === subCategory.slug ? 'active' : ''}
                >
                  {subCategory.name}
                </Link>
              </li>
            ))
            )}
          </ul>
        )}
      </nav>
      <div className='home__item'>
        <div className='item__card'>
          {courses.map(course => (
            <CourseCard course={course} key={course.id} />
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={(p) =>
            setSearchParams({ page: p })
          }
        />
      </div>
    </div>
  )
}

export default Home