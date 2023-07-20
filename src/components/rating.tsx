function Rating({ ranking } : { ranking: Array<number>}) {

  const {length} = ranking
  const average = ranking.reduce((acc, ranking) => acc + ranking,0)/length
  const value = Math.floor(average)

  const ratingCounting = [1,2,3,4,5]

  return (
    <div className="flex gap-2">
      {ratingCounting.map((element, index) => {
        return (
          <img
            className="h-5"
            key={index}
            src={
              index <= value ? "/icons/good-star.png" : "/icons/bad-star.png"
            }
            alt={value <= index ? "good star" : "bad-star"}
          />
        );
      })}
    </div>
  );
}

export default Rating;
