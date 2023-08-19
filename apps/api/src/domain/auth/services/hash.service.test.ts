import { HashService } from '@app/domain/auth/services/hash.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('hash-service', () => {
  let service: HashService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [HashService],
    }).compile();

    service = app.get<HashService>(HashService);
  });

  it('test', async () => {
    const plain = 'just';
    const hashed = await service.hash(plain);

    const isMatched = await service.compare('not', hashed);

    console.log(isMatched, 'MATCHED');
  });
});
