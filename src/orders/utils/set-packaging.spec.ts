import { packProducts } from './set-packaging';
import { Product } from '../../products/entities/product.entity';

describe('packProducts', () => {
  it('deve embalar um único produto na caixa correta', () => {
    const product = new Product('PS5', 40, 10, 25);
    const result = packProducts([product]);
    expect(result.length).toBe(1);
    expect(result[0].products).toContain('PS5');
  });

  it('deve devolver uma nota se o produto não couber em nenhuma caixa', () => {
    const product = new Product('Cadeira Gamer', 120, 60, 70);
    const result = packProducts([product]);
    expect(result[0].boxId).toBeNull();
    expect(result[0].note).toBe('O produto não cabe em nenhuma caixa disponível.');
  });

  it('deve caber em uma caixa se for necessário rotacionar', () => {
    const product = new Product('ItemRotated', 40, 80, 50);
    const result = packProducts([product]);
    expect(result[0].boxId).not.toBeNull();
    expect(result[0].products).toContain('ItemRotated');
  });

  it('não deve caber em nenhuma caixa se mesmo com rotação for grande demais', () => {
    const product = new Product('TooBig', 200, 200, 200);
    const result = packProducts([product]);
    expect(result[0].boxId).toBeNull();
    expect(result[0].note).toBe('O produto não cabe em nenhuma caixa disponível.');
  });
});
