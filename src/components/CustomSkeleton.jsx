const ImageSkeleton = () => {
  return <div className="skeleton h-52 w-52"></div>;
};

const TextSkeleton = ({ width, height, space }) => {
  return (
    <div
      className={`skeleton bg-gray-300 rounded-md ${width} ${height} ${space}`}
    ></div>
  );
};

const ListSkeleton = ({ count, gridCols = "grid-cols-1" }) => {
  return (
    <ul className={`grid ${gridCols} gap-4`}>
      {Array(count)
        .fill("")
        .map((_, i) => (
          <li
            key={i}
            className="skeleton bg-gray-300 h-8 w-full rounded-lg"
          ></li>
        ))}
    </ul>
  );
};

const NutritionalInfoSkeleton = () => {
  return (
    <div className="flex space-x-4">
      {Array(3)
        .fill("")
        .map((_, i) => (
          <div
            key={i}
            className="skeleton bg-gray-300 h-16 w-32 rounded-lg"
          ></div>
        ))}
    </div>
  );
};

export { ImageSkeleton, TextSkeleton, ListSkeleton, NutritionalInfoSkeleton };
