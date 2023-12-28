import { MarketsOverview } from '@app/entities/coin';
import { nanoid } from '@reduxjs/toolkit';

export default function Markets() {
  return (
    <main className='flex flex-row'>
      <MarketsOverview instanceKey={nanoid()} />
      <MarketsOverview instanceKey={nanoid()} />
    </main>
  );
}
