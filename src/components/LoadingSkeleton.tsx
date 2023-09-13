interface LoadingSkeletonProps {
  width?: number;
  height?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width,
  height,
}) => {
  return (
    <div
      className={`${width ? `w-[${width}px]` : "w-full"} ${
        height ? `h-[${height}px]` : "h-full"
      } rounded-lg bg-indigo-100 animate-skeleton`}></div>
  );
};
