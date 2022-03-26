import { Injectable } from '@nestjs/common';
import {
  readPermission,
  writePermission,
} from '@projects/auth';

import { ProductService } from './resources';
import { CategoryService } from './resources/category';
import { ProductDetailService } from './resources/product-detail';
import { StoreService } from './resources/store';
import { UserService } from './resources/user';

@Injectable()
export class AppService {
  constructor(
    private readonly storeService: StoreService,
    private readonly userService: UserService,
    protected readonly productService: ProductService,
    protected readonly categoryService: CategoryService,
    protected readonly productDetailService: ProductDetailService
  ) {}

  async initStore() {
    const store1 = await this.storeService.save({ name: 'Store 1' });
    const store2 = await this.storeService.save({ name: 'Store 2' });
    const user = await this.userService.save({
      username: 'nxng.dev@gmail.com',
      password: 'password',
      permissions: [readPermission('product'), writePermission('product')],
    });

    const product = await this.productService.save({
      name: 'Ps4 Controller',
      description: 'PS4 Controller',
      barcode: '1234567891231',
    });

    const product1 = await this.productService.save({
      name: 'TY bear',
      description: 'TY',
      barcode: '1234567891232',
    });
    const product2 = await this.productService.save({
      name: 'Atari 2004',
      description: 'Atari',
      barcode: '1234567891233',
    });

    const toyCategory = await this.categoryService.save({ name: 'Toy' });
    const consoleCategory = await this.categoryService.save({
      name: 'Console',
    });

    const pDetail1 = await this.productDetailService.save({
      price: 100,
      quantity: 200,
      product: { id: product1.id },
      store: { id: store1.id },
    });

    const pDetail2 = await this.productDetailService.save({
      price: 200,
      quantity: 10,
      product: { id: product1.id },
      store: { id: store2.id },
    });
  }
  getData(): { message: string } {
    return { message: 'Welcome to api-inventory!' };
  }
}
