export interface Product {
    id: number;
    product_name: string;
    unit_price: number;
    brand: string;
    image: string;
  }
  
  export interface WishList {
    id: number;
    userId: number;
    product: Product;
  }
  