import { CarController } from '@app/domain/car/controller/car.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CarController],
})
export class CarModule {}
