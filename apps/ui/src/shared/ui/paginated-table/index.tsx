import { ReactNode, useEffect } from 'react';

interface Props {
  render: () => ReactNode;
  onRefetchPosition: () => void;
  hasMore: boolean;
  isFetching: boolean;
}

export const PaginatedTable = ({ render, onRefetchPosition, hasMore, isFetching }: Props) => {
  useEffect(() => {
    const appRef = document.body;

    const handleScroll = () => {
      const pageHeight = appRef?.scrollHeight || 0;
      const topPosition = (appRef?.scrollTop || 0) + window.innerHeight;
      const position = pageHeight - topPosition;

      if (position < 180 && hasMore && !isFetching) {
        onRefetchPosition();
      }
    };

    appRef?.addEventListener('scroll', handleScroll);
    return () => appRef?.removeEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    if (hasMore && !isFetching) {
      onRefetchPosition();
    }
  }, []);

  return <div className='grid grid-cols-1 gap-y-2'>{render()}</div>;
};
