import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '../../../../dtos/ICreateCarsDTO';
import { Car } from '../../entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;
  constructor() {
    this.repository = getRepository(Car);
  }
  async findById(car_id: string): Promise<Car> {
    const car = await this.repository.findOne(car_id);
    return car;
  }
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);
    await this.repository.save(car);
    return car;
  }
  findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.repository.findOne({ license_plate });
    return car;
  }
  async list(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });
    if (name) {
      carsQuery.andWhere('name = :name', { name });
    }
    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand });
    }
    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id });
    }
    const cars = await carsQuery.getMany();
    return cars;
  }
  async updateAvailable(id: string, available: boolean): Promise<Car> {
    const car = await this.repository.findOne(id);
    car.available = available;
    await this.repository.save(car);
    return car;
  }
}

export { CarsRepository };
