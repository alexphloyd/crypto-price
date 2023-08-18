import { PrismaService } from './prisma.service';

describe('prisma service', () => {
  describe('connection', () => {
    it('should connect to db', async () => {
      const onConnectionError = await new PrismaService()
        .onModuleInit()
        .catch((error) => error);

      expect(onConnectionError).toBeUndefined();
    });
  });
});
