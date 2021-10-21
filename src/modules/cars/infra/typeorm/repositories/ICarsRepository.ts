import { ICreateCarDTO } from '../../../dtos/ICreateCarsDTO';
import { Car } from '../entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  list(category_id?: string, name?: string, brand?: string): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<Car>;
}

export { ICarsRepository };
