export class Product {
  productId: string;
  height: number;
  width: number;
  length: number;

  constructor(
    productId: string,
    height: number,
    width: number,
    length: number,
  ) {
    this.productId = productId;
    this.height = height;
    this.width = width;
    this.length = length;
  }

  getVolume(): number {
    return this.height * this.width * this.length;
  }
}
