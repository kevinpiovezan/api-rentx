import { getRepository, Repository } from 'typeorm';

import { CarImages } from '../../entities/CarImage';
import { ICarsImagesRepository } from '../ICarsImagesRepository';

class CarImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImages>;
  constructor() {
    this.repository = getRepository(CarImages);
  }
  async create(car_id: string, image_name: string): Promise<CarImages> {
    const carImage = await this.repository.create({ car_id, image_name });
    const car = await this.repository.save(carImage);
    return car;
  }
}

export { CarImagesRepository };
