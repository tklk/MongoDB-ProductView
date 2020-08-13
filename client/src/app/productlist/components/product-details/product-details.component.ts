import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent {
  @Input() product: Product;
  @Input() createHandler: Function;
  @Input() updateHandler: Function;
  @Input() deleteHandler: Function;
  
  constructor(private ProductService: ProductService) {}

  createProduct(prod: Product) {
    this.ProductService
      .createProduct(prod)
      .subscribe((newProduct: Product) => {
        this.createHandler(newProduct);
      });
  }
  updateProductDetail(prod: Product): void {
    this.ProductService
      .updateProduct(prod)
      .subscribe((putProduct: Product) => {
        this.updateHandler(putProduct);
      });
  }
  deleteProduct(prodId: String): void {
    this.ProductService
      .deleteProduct(prodId)
      .subscribe((delProdId: String) => {
        this.deleteHandler(delProdId);
      });
  }
}
