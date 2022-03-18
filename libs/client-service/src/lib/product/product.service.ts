import { CollectionViewer } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

import { Product } from './product.entity';

@Injectable({ providedIn: 'root' })
export class ProductService extends EntityCollectionServiceBase<Product> {
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  subsink = new SubSink();
  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', elementsFactory);
  }

  connect(collectionViewer: CollectionViewer): Observable<readonly Product[]> {
    this.subsink.sink = this.getAll().subscribe();
    return this.filteredEntities$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subsink.unsubscribe();
  }
}