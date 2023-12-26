import { MarketsOverview } from '@app/entities/coin';

export default function Home() {
  return (
    <main className='flex flex-row'>
      <MarketsOverview mode='global' />
      <MarketsOverview mode='personal' />
    </main>
  );
}
