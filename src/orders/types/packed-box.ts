export interface PackedBox {
  boxId: string | null;
  products: string[];
  note?: string; //Apenas caso o produto não caiba em nenhuma caixa
}