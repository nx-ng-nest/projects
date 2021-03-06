import { Response } from 'express';

import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ReadPermission,
  Secure,
  WritePermission,
} from '@projects/auth';
import {
  Category,
  CreateValidationPipe,
  UpdateValidationPipe,
} from '@projects/models';

import { CategoryService } from './category.service';

const SINGULAR = 'category';
const BYID = 'category/:id';
const BYUUID = 'category/uuid/:uuid';
const PLURAL = 'categories';
const STREAM = 'category-stream';
const COLUMNS = 'category-columns';

@Secure()
@ApiTags(CategoryControllerRead.name)
@UseInterceptors(CacheInterceptor)
@Controller()
export class CategoryControllerRead {
  constructor(private readonly categoryService: CategoryService) {}

  @ReadPermission(SINGULAR)
  @Get(STREAM)
  async stream(@Res() res: Response) {
    this.categoryService.stream(res);
  }

  @ReadPermission(SINGULAR)
  @Get(COLUMNS)
  async columns() {
    return this.categoryService.columns();
  }

  @ReadPermission(SINGULAR)
  @Get(BYID)
  getOneById(@Param('id') id: number) {
    return this.categoryService.findOne({ where: { id } });
  }

  @ReadPermission(SINGULAR)
  @Get(BYUUID)
  getOneByUUID(@Param('uuid') uuid: number) {
    return this.categoryService.findOne({ where: { uuid } });
  }

  @ReadPermission(SINGULAR)
  @Get(PLURAL)
  async get() {
    return this.categoryService.find();
  }
}

@Secure()
@ApiTags(CategoryControllerWrite.name)
@Controller()
export class CategoryControllerWrite {
  constructor(private readonly categoryService: CategoryService) {}

  @WritePermission(SINGULAR)
  @Post(SINGULAR)
  post(@Body(CreateValidationPipe) body: Category) {
    const newCategory = this.categoryService.save(body);
    return newCategory;
  }

  @WritePermission(SINGULAR)
  @Patch(SINGULAR + '/:id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateValidationPipe) updated: Category
  ) {
    return this.categoryService.update(id, updated);
  }

  @WritePermission(SINGULAR)
  @Delete(SINGULAR + '/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
