import { Product } from '../../products/entities/product.entity';
import { Box } from '../../boxes/entities/box.entity';
import { BOX_SIZES } from '../../constants/boxes.constants';
import { PackedBox } from '../types/packed-box';

export function packProducts(products: Product[]): PackedBox[] {
  const result: PackedBox[] = [];
  const productsWithoutBox: Product[] = [...products];

  while (productsWithoutBox.length > 0) {
    const product = productsWithoutBox.shift();

    //Verificação extra, se ainda existe produto fora da caixa.
    if (!product) continue;

    let selectedBox: Box | null = null;

    for (const box of BOX_SIZES) {
      //Tenta colocar produto na caixa
      if (box.fits(product)) {
        selectedBox = new Box(box.boxId, box.height, box.width, box.length);
        selectedBox.products.push(product.productId);

        //Tenta colocar outros produtos na mesma caixa
        for (let i = productsWithoutBox.length - 1; i >= 0; i--) {
          if (box.fits(productsWithoutBox[i])) {
            selectedBox.products.push(productsWithoutBox[i].productId);
            productsWithoutBox.splice(i, 1);
          }
        }
        result.push(selectedBox);
        break;
      }
    }

    //Se o produto não couber em nenhuma caixa
    if (!selectedBox) {
      result.push({
        boxId: null,
        products: [product.productId],
        note: "O produto não cabe em nenhuma caixa disponível.",
      });
    }
  }

  return result;
}
