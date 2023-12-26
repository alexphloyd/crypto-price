import { useAppDispatch } from '@app/app/store/hooks';
import { type CoinModelState, coinModel } from '@app/entities/coin';
import { Typography } from 'antd';
import { useEffect } from 'react';

interface Props {
  mode: keyof CoinModelState['marketsOverview']['data'];
}

export function MarketsOverview({ mode }: Props) {
  const dispatch = useAppDispatch();

  const markets = coinModel.useMarketsOverview({
    subject: 'data',
    mode,
  });
  const effect = coinModel.useEffectState({
    effect: 'getMarkets',
    mode,
  });

  useEffect(() => {
    dispatch(
      coinModel.effects.getMarkets({
        mode,
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
      {markets?.map(({ name, market_cap }) => (
        <Typography.Text>
          {name}: {market_cap}
        </Typography.Text>
      ))}
    </ul>
  );
}
