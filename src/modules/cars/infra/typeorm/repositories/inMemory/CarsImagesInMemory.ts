import { CarImages } from '../../entities/CarImage';
import { ICarsImagesRepository } from '../ICarsImagesRepository';

class CarsImagesInMemory implements ICarsImagesRepository {
  private carImages: CarImages[] = [];
  async create(car_id: string, image_name: string): Promise<CarImages> {
    const carImage = new CarImages();
    Object.assign(carImage, {
      car_id,
      image_name,
    });
    this.carImages.push(carImage);
    return carImage;
  }
}

export { CarsImagesInMemory };
