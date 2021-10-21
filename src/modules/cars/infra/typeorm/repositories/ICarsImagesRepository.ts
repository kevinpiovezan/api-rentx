import { CarImages } from '../entities/CarImage';

interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImages>;
}

export { ICarsImagesRepository };
