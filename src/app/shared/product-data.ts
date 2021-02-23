import { InMemoryDbService } from 'angular-in-memory-web-api';

export class ProductData implements InMemoryDbService {

  createDb() {
    let products = [
      {
        "id": 0,
        "title": "Uno Product",
        "price": 24.99,
        "rating": 4.3,
        "shortDescription": "This is a short description of the First Product",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "categories": ["electronics", "hardware"],
        "image": "http://placehold.it/820x320"
      },
      {
        "id": 1,
        "title": "Second Product",
        "price": 64.99,
        "rating": 3.5,
        "shortDescription": "This is a short description of the Second Product",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "categories": ["books"],
        "image": "http://placehold.it/820x320"
      },
      {
        "id": 2,
        "title": "Third Product",
        "price": 74.99,
        "rating": 4.2,
        "shortDescription": "This is a short description of the Third Product",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "categories": ["electronics"],
        "image": "http://placehold.it/820x320"
      },
      {
        "id": 3,
        "title": "Fourth Product",
        "price": 84.99,
        "rating": 3.9,
        "shortDescription": "This is a short description of the Fourth Product",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "categories": ["hardware"],
        "image": "http://placehold.it/820x320"
      },
      {
        "id": 4,
        "title": "Fifth Product",
        "price": 94.99,
        "rating": 5,
        "shortDescription": "This is a short description of the Fifth Product",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "categories": ["electronics", "hardware"],
        "image": "http://placehold.it/820x320"
      },
      {
        "id": 5,
        "title": "Sixth Product",
        "price": 54.99,
        "rating": 4.6,
        "shortDescription": "This is a short description of the Sixth Product",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "categories": ["books"],
        "image": "http://placehold.it/820x320"
      }
    ];
    return { products: products };
  }
}
