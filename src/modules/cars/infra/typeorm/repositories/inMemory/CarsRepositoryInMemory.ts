import { ICreateCarDTO } from '../../../../dtos/ICreateCarsDTO';
import { Car } from '../../entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, data);
    this.cars.push(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);
    return car;
  }
  async list(category_id: string, name: string, brand: string): Promise<Car[]> {
    const allCars = this.cars.filter((car) => {
      if (
        car.available === true ||
        (name && car.name === name) ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id)
      ) {
        return car;
      }
      return null;
    });
    return allCars;
  }
  async findById(car_id: string): Promise<Car> {
    const car = await this.cars.find((car) => car.id === car_id);
    return car;
  }
  async updateAvailable(id: string, available: boolean): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);
    car.available = available;
    return car;
  }
}

export { CarsRepositoryInMemory };
