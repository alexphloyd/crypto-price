import { MarketsOverview, MARKETS_INSTANCES } from '@app/entities/coin';

export default function Markets() {
  return (
    <main className='flex flex-row'>
      <MarketsOverview instanceKey={MARKETS_INSTANCES.GLOBAL} />
      <MarketsOverview instanceKey={MARKETS_INSTANCES.PERSONAL} />
    </main>
  );
}
