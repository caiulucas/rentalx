import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { SpecificationsRepositoryInMemory } from '../../repositories/in-memory/SpecificationsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to add specifications on a car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'A Nice One',
      description: 'This is a test description',
      daily_rate: 100,
      license_plate: 'TST-1234',
      fine_amount: 60,
      brand: 'Test Brand',
      category_id: 'c4t3g0ry',
    });

    const specificationsPromises: Promise<Specification>[] = [];

    for (let index = 0; index <= 1; index += 1) {
      specificationsPromises.push(
        specificationsRepositoryInMemory.create({
          name: `Specification ${index}`,
          description: `This is the specification ${index}`,
        }),
      );
    }

    const specifications = await Promise.all(specificationsPromises);

    const carWithSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids: [specifications[0].id, specifications[1].id],
    });

    expect(carWithSpecifications.specifications).toEqual(specifications);
  });

  it('should not be able to add specifications on a non-existent car', async () => {
    const car_id = '1234';
    const specifications_ids = ['4321', '5123'];

    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_ids,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not repeat a already added specification in car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'A Nice One',
      description: 'This is a test description',
      daily_rate: 100,
      license_plate: 'TST-1234',
      fine_amount: 60,
      brand: 'Test Brand',
      category_id: 'c4t3g0ry',
    });

    const specificationsPromises: Promise<Specification>[] = [];

    for (let index = 0; index <= 2; index += 1) {
      specificationsPromises.push(
        specificationsRepositoryInMemory.create({
          name: `Specification ${index}`,
          description: `This is the specification ${index}`,
        }),
      );
    }

    const specifications = await Promise.all(specificationsPromises);

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids: [specifications[0].id],
    });

    const carWithNewSpecifications =
      await createCarSpecificationUseCase.execute({
        car_id: car.id,
        specifications_ids: [
          specifications[0].id,
          specifications[1].id,
          specifications[2].id,
        ],
      });

    expect(carWithNewSpecifications.specifications).toEqual(specifications);
  });
});
