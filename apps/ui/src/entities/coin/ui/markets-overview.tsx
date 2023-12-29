import { type MarketInstancesKey } from '../model/types/markets/core';
import { useAppDispatch } from '@app/app/store/hooks';
import { coinModel } from '@app/entities/coin';
import { Typography } from 'antd';
import { useEffect } from 'react';

interface Props {
  instanceKey: MarketInstancesKey;
}

export function MarketsOverview({ instanceKey }: Props) {
  const dispatch = useAppDispatch();

  const markets = coinModel.useMarketsOverview({ instanceKey, subject: 'data' });
  const { error, status } = coinModel.useMarketsOverview({
    instanceKey,
    subject: 'getMarketsEffect',
  });

  useEffect(() => {
    dispatch(
      coinModel.effects.getMarkets({
        instanceKey,
        queryArgs: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          page: '1',
          per_page: Math.round(Math.random() * 10).toString(),
          locale: 'en',
          sparkline: 'false',
          precision: 'full',
        },
      }),
    );
  }, []);

  if (error) {
    return <span>{error}</span>;
  }

  if (status === 'pending') {
    return <span>loading..</span>;
  }

  return (
    <ul className='flex flex-col gap-2'>
      {markets?.map(({ name, market_cap }) => (
        <Typography.Text>
          {name}: {market_cap}
        </Typography.Text>
      ))}
    </ul>
  );
}
