// create --
// remove
// list with pagination

import { Body, Controller, Post } from '@nestjs/common';
import { AddCarToSellingListSchema } from '@dto/car/schemas/add-car-to-selling-list.schema';

@Controller('car')
export class CarController {
  constructor() {}

  @Post('add-car-to-selling-list')
  async addCarToSellingList(@Body() carInfo: AddCarToSellingListSchema) {}
}
