import React from 'react'
import noimg from '../../asserts/img/noImage.jpg'

const Image = ( {course} ) => {
    return (
        <>
            {
                course.thumbnailImage ? (
                    <img src={course.thumbnailImage} alt={course.title} loading="lazy" decoding="async" />
                ) : course.thumbnailVideo ? (
                    <video muted autoPlay loop  preload="none" playsInline>
                        <source src={course.thumbnailVideo} type="video/mp4" alt={course.title} />
                    </video>
                ) : (
                    <img src={noimg} alt={course.title} loading="lazy" decoding="async" />
                )
            }
        </>
    )
}

export default Image
