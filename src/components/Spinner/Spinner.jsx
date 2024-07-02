import { RevolvingDot } from 'react-loader-spinner';

export const Spinner = () => {
  const height = '80';
  const width = '80';
  return (
    <RevolvingDot
      height={height}
      width={width}
      color="#4fa94d"
      ariaLabel="revolving-dot-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
