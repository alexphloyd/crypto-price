import { z } from 'zod';
import { CarCondition, CarTransmission, CarType } from '@prisma/client';

export const AddCarToSellingListSchema = z.object({
  email: z.string().min(1, { message: 'must be longer' }).email({ message: 'must be valid' }),

  price: z.number().nonnegative({ message: 'must be positive' }),
  mileage: z.number().nonnegative({ message: 'must be positive' }),
  condition: z.nativeEnum(CarCondition, { errorMap: () => ({ message: 'must be specified' }) }),
  photos: z.custom<FileList>(),
  // .refine((photos) => !photos, `Max image size is 5MB.`)
  // .refine(
  //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //   'Only .jpg, .jpeg, .png and .webp formats are supported.',
  // ),

  make: z.string().min(2, { message: 'must be specified' }),
  model: z.string().min(2, { message: 'must be specified' }),

  generation: z.string().optional(),
  transmission: z.nativeEnum(CarTransmission, { errorMap: () => ({ message: 'must be specified' }) }),

  type: z.nativeEnum(CarType, { errorMap: () => ({ message: 'must be specified' }) }),
  productionYear: z.string(),
});

type File = any;
type FileList = File[];
