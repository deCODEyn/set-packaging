import { Product } from '../../products/entities/product.entity';

export class Box {
  boxId: string;
  height: number;
  width: number;
  length: number;
  products: string[] = [];

  constructor(boxId: string, height: number, width: number, length: number) {
    this.boxId = boxId;
    this.height = height;
    this.width = width;
    this.length = length;
  }

  getVolume(): number {
    return this.height * this.width * this.length;
  }

  fits(product: Product): boolean {
    return (
      product.height <= this.height &&
      product.width <= this.width &&
      product.length <= this.length
    );
  }
}
