import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'A Nice One',
      description: 'This is a test description',
      daily_rate: 100,
      license_plate: 'TST-1234',
      fine_amount: 60,
      brand: 'Test Brand',
      category_id: 'c4t3g0ry',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'A Nice One',
      description: 'This is a test description',
      daily_rate: 100,
      license_plate: 'TST-1234',
      fine_amount: 60,
      brand: 'Test Brand',
      category_id: 'c4t3g0ry',
    });

    await carsRepositoryInMemory.create({
      name: 'A Good One',
      description: 'This is a test description',
      daily_rate: 100,
      license_plate: 'TST-4321',
      fine_amount: 60,
      brand: 'Test Brand',
      category_id: 'c4t3g0ry',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'A Nice One' });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand name', async () => {
    const carsCreated = [];
    carsCreated.push(
      await carsRepositoryInMemory.create({
        name: 'A Nice One',
        description: 'This is a test description',
        daily_rate: 100,
        license_plate: 'TST-1234',
        fine_amount: 60,
        brand: 'Test Brand',
        category_id: 'c4t3g0ry',
      }),
    );

    carsCreated.push(
      await carsRepositoryInMemory.create({
        name: 'A Good One',
        description: 'This is a test description',
        daily_rate: 100,
        license_plate: 'TST-4321',
        fine_amount: 60,
        brand: 'Test Brand',
        category_id: 'c4t3g0ry',
      }),
    );

    await carsRepositoryInMemory.create({
      name: 'A Beauty One',
      description: 'This is a test description',
      daily_rate: 100,
      license_plate: 'TST-1111',
      fine_amount: 60,
      brand: 'Another Test Brand',
      category_id: 'c4t3g0ry',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Test Brand',
    });

    expect(cars).toEqual(carsCreated);
  });

  it('should be able to list all available cars by category', async () => {
    const carsCreated = [];
    carsCreated.push(
      await carsRepositoryInMemory.create({
        name: 'A Nice One',
        description: 'This is a test description',
        daily_rate: 100,
        license_plate: 'TST-1234',
        fine_amount: 60,
        brand: 'Test Brand',
        category_id: 'c4t3g0ry',
      }),
    );

    carsCreated.push(
      await carsRepositoryInMemory.create({
        name: 'A Good One',
        description: 'This is a test description',
        daily_rate: 100,
        license_plate: 'TST-4321',
        fine_amount: 60,
        brand: 'Test Brand',
        category_id: 'c4t3g0ry',
      }),
    );

    await carsRepositoryInMemory.create({
      name: 'A Beauty One',
      description: 'This is a test description',
      daily_rate: 100,
      license_plate: 'TST-1111',
      fine_amount: 60,
      brand: 'Test Brand',
      category_id: '4n0th3r_c4t3g0ry',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'c4t3g0ry',
    });

    expect(cars).toEqual(carsCreated);
  });
});
