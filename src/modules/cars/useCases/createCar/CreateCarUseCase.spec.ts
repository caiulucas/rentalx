import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'A Nice One',
      description: 'This is a test description',
      daily_rate: 100,
      license_plate: 'TST-1234',
      fine_amount: 60,
      brand: 'Test Brand',
      category_id: 'c4t3g0ry',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with existent license plate', async () => {
    await createCarUseCase.execute({
      name: 'A Nice One',
      description: 'This is a test description',
      daily_rate: 100,
      license_plate: 'TST-1234',
      fine_amount: 60,
      brand: 'Test Brand',
      category_id: 'c4t3g0ry',
    });

    expect(async () => {
      await createCarUseCase.execute({
        name: 'A Good One',
        description: 'This is another test description',
        daily_rate: 90,
        license_plate: 'TST-1234',
        fine_amount: 40,
        brand: 'Another Test Brand',
        category_id: 'c4t3g0ry',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a available car by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'A Good One',
      description: 'This is another test description',
      daily_rate: 90,
      license_plate: 'TST-1234',
      fine_amount: 40,
      brand: 'Another Test Brand',
      category_id: 'c4t3g0ry',
    });

    expect(car.available).toBeTruthy();
  });
});
