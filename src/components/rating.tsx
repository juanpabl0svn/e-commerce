function Rating({ rating }) {
  const ratingCounting = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-2">
      {ratingCounting.map((element, index) => {
        return (
          <img
            className="h-5"
            key={index}
            src={
              index <= rating ? "/icons/good-star.png" : "/icons/bad-star.png"
            }
            alt={index <= rating ? "good star" : "bad-star"}
          />
        );
      })}
    </div>
  );
}

export default Rating;
