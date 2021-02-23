import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../shared/product';
import { ProductService } from '../shared/product.service';

@Component({
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit{

  pageTitle = 'Product Edit';
  errorMessage: string;
  productForm: FormGroup;

  prodId:number;
  product: Product;

  constructor(private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private productService: ProductService) {  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      categories: '',
      rating: '',
      price: '',
      description: '',
      shortDescription: '',
      image: ''
    });

    // Read the product Id from the route parameter
    this.prodId = parseInt(this.activatedroute.snapshot.params['id']);
    this.getProduct(this.prodId);
  }

  getProduct(id: number): void {
    this.productService.getProductById(id)
      .subscribe(
        (product: Product) => this.displayProduct(product),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayProduct(product: Product): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;
    this.pageTitle = `Edit Product: ${this.product.title}`;

    // Update the data on the form
    this.productForm.patchValue({
      title: this.product.title,
      price: this.product.price,
      rating: this.product.rating,
      description: this.product.description,
      shortDescription: this.product.shortDescription,
      categories: this.product.categories,
      image: this.product.images
    });
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.title}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }


  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        this.product = this.productForm.value;
        this.product.id = this.prodId;
        
        this.productService.updateProduct(this.product)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
      
        
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['']);
  }
}
