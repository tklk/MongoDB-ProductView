import { Component } from '@angular/core';
import { ProductService } from './productlist/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})
export class AppComponent {
  constructor (private ProductService: ProductService) {}
  title = 'productlist';
}
