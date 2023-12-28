import { useAppDispatch } from '@app/app/store/hooks';
import { coinModel } from '@app/entities/coin';
import { Typography } from 'antd';
import { useEffect } from 'react';

interface Props {
  instanceKey: InstanceKey;
}

export function MarketsOverview({ instanceKey }: Props) {
  const dispatch = useAppDispatch();

  const markets = coinModel.useMarketsOverview({ instanceKey, subject: 'data' });
  const getCategoriesEffect = coinModel.useCategories({ subject: 'getCategoriesEffect' });

  console.log(getCategoriesEffect.status);

  useEffect(() => {
    dispatch(coinModel.actions.createMarketsInstance(instanceKey));
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
