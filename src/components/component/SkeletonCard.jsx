import '../../asserts/scss/component/_SkeletonCard.scss'

const SkeletonList = () => {
  return (
    <div className="course-list">
      {Array(12).fill(0).map((_, i) => (
        <div className="skeleton-card" key={i}>
            <div className="thumb" />
            <div className="text title" />
            <span className="text sub" />
            <div className='text rating' />
        </div>
      ))}
    </div>
  );
};

export default SkeletonList;