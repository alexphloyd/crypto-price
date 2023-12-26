import { MarketsOverview } from '@app/entities/coin';

export default function Home() {
  return (
    <main className='flex flex-row'>
      <MarketsOverview type='base' />
      <MarketsOverview type='personal' />
    </main>
  );
}
