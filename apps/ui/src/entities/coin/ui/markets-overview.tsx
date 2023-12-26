import { useAppDispatch } from '@app/app/store/hooks';
import { type CoinModelState, coinModel } from '@app/entities/coin';
import { Typography } from 'antd';
import { useEffect } from 'react';

interface Props {
  type: keyof CoinModelState['marketsOverview'];
}

export function MarketsOverview({ type }: Props) {
  const dispatch = useAppDispatch();

  const markets = coinModel.useMarketsOverview(type);
  const effect = coinModel.useEffectState('getMarkets')[type];

  useEffect(() => {
    dispatch(
      coinModel.effects.getMarkets({
        type,
        queryArgs: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          page: '1',
          per_page: '20',
          locale: 'en',
          sparkline: 'false',
          precision: 'full',
        },
      }),
    );
  }, []);

  if (effect.error) {
    return (
      <Typography.Text type='danger' className='p-3 ml-14'>
        {effect.error}
      </Typography.Text>
    );
  }

  return (
    <ul className='flex flex-col gap-2'>
      {markets?.map(({ name, market_cap }) => <Typography.Text>{name}</Typography.Text>)}
    </ul>
  );
}
