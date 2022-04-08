import { Injectable } from '@angular/core';

import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IProduct } from '@projects/interface';

import { BaseCollectionService } from '../base';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseCollectionService<IProduct> {
  constructor(elementFactory: EntityCollectionServiceElementsFactory) {
    super('Product', elementFactory);
  }
}
