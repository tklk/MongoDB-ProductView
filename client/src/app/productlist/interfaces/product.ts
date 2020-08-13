export interface Product {
    _id?: string;
    title: string;
    price: number;
    description: string;
    imageUrl: string;
}

export interface ProductList {
    products: Product[]
}