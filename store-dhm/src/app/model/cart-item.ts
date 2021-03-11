import { Product } from './product';

export class CartItem {
    id: number;
    nameproduct: string;
    image: string;
    qty: number;
    price: number;

    constructor(product: Product) {
        this.id = product.id;
        this.nameproduct = product.nameproduct;
        this.image = product.image;
        this.price = product.price;
        this.qty = 1;
    }
}
