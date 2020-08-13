import { Component, OnInit, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { ProductClass } from '../../classes/product-class';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  products: Product[];
  selectedProd: Product;
  
  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
  }

  form: FormGroup;
  formControls = {};
  model = new ProductClass('', '[Default] Toy', 1, 'tesla truck', 'https://crdms.images.consumerreports.org/c_lfill,w_720,q_auto,f_auto/prod/cars/cr/model-years/11213-2022-tesla-cybertruck');
  modelKeys = Object.keys(this.model);

  constructor(
    private ProductService: ProductService,
    private scroll: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.getProductLst();
  }

  private getIndex = (prodId: String) => {
    return this.products.findIndex((p) => {
      return p._id === prodId;
    });
  }

  selectProd(prod: Product) {
    this.selectedProd = prod;
    this.scrollToTop();
  }

  getProductLst = () => {
    this.ProductService
      .getList()
      .subscribe((prods: Product[]) => {
        this.products = prods.map((p) => {
          if (!p.imageUrl) {
            p.imageUrl = "https://crdms.images.consumerreports.org/c_lfill,w_720,q_auto,f_auto/prod/cars/cr/model-years/11213-2022-tesla-cybertruck";
          }
          if (!p.price) {
            p.price = 666;
          }
          return p;
        }, (error) => {
          alert("Error: " + error.statusText);
        })
      });
  }

  createNewProduct() {
    const prod: Product = {
      title: '[Default] Toy',
      price: 1,
      description: 'tesla truck',
      imageUrl: 'https://crdms.images.consumerreports.org/c_lfill,w_720,q_auto,f_auto/prod/cars/cr/model-years/11213-2022-tesla-cybertruck'
    };
    // New product will have the selected state.
    this.selectProd(prod);
  }

  addProduct = (prod: Product) => {
    this.products.push(prod);
    this.selectProd(null);
    this.getProductLst();
  }

  updateProduct = (prod: Product) => {
    const index = this.getIndex(prod._id);
    if (index !== -1) {
      this.products[index] = prod;
      this.selectProd(null);
    }
    this.getProductLst();
  }

  deleteProduct = (prodId: String) => {
    const index = this.getIndex(prodId);
    if (index !== -1) {
      this.products = this.products.filter(elem => elem._id !== prodId);
      this.selectProd(null);
    }
    this.getProductLst();
  }

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }
}
