import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import {
  CategoryService,
  ProductService,
} from '@projects/client-service';
import { TableModuleTokens } from '@projects/ui';

import { CrudComponent } from '../../crud/crud.component';
import { CrudModule } from '../../crud/crud.module';
import { initFormOptions } from './product-form-options';
import { ProductGuard } from './product.guard';

const productColumns = [
  'selected',
  'id',
  'uuid',
  'name',
  'description',
  'id1',
  'id2',
  'id3',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'active',
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('product', {}),
    CrudModule.register({
      resourceName: 'Product',
      dataService: ProductService,
      formOptions: initFormOptions,
      guard: ProductGuard,
      tableOptions: {
        columns: productColumns,
        displayedColumns: ['selected', 'uuid', 'name', 'description', 'active'],
        searchableColumns: productColumns,
        tableActions: [],
      },

      createToolbarOptions: {
        toolbarItems: [{ path: '', label: 'Item 1', icon: 'add' }],
      },
      updateToolbarOptions: {
        toolbarItems: [{ path: '', label: 'Item 1', icon: 'edit' }],
      },
      deleteToolbarOptions: {
        toolbarItems: [{ path: '', label: 'Item 1', icon: 'trash' }],
      },
      viewToolbarOptions: {
        toolbarItems: [{ path: '', label: 'Item 1', icon: 'view_list' }],
      },
    }),
    RouterModule.forChild([
      {
        path: '',
        component: CrudComponent,
      },
    ]),
  ],
  providers: [
    ProductService,
    CategoryService,
    ProductGuard,
    {
      provide: TableModuleTokens.TABLE_MODULE_DATA_SERVICE,
      useClass: ProductService,
    },
  ],
})
export class ProductModule {}
