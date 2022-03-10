import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthJwtGuard,
  Permission,
} from '@projects/auth';
import { FindManyOptions } from '@projects/utils';
import {
  ValidateCreate,
  ValidateUpdate,
} from '@projects/validation';

import { CategoryDTO } from './category.dto';
import { CategoryService } from './category.service';

@ApiTags(CategoryController.name)
@UseGuards(AuthJwtGuard)
@Controller()
export class CategoryController {
  constructor(private readonly categoryRepo: CategoryService) {}

  @Get('categorys')
  @Permission({ method: 'GET', resource: 'category' })
  getAll(@Query() query: Record<string, any>) {
    return this.categoryRepo.getAll(query);
  }

  @Post('categorys')
  @Permission({ method: 'GET', resource: 'category' })
  getAllWithQuery(@Body() query: FindManyOptions) {
    return this.categoryRepo.getAllWithQuery(query);
  }

  @Get('category/:id')
  @Permission({ method: 'GET', resource: 'category' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryRepo.getById(id);
  }

  @Post('category')
  @Permission({ method: 'POST', resource: 'category' })
  createOne(@Body(ValidateCreate) body: CategoryDTO) {
    return this.categoryRepo.createOne(body);
  }

  @Patch('category/:id')
  @Permission({ method: 'PATCH', resource: 'category' })
  patchOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: CategoryDTO
  ) {
    return this.categoryRepo.patchOne(id, body);
  }

  @Delete('category/:id')
  @Permission({ method: 'DELETE', resource: 'category' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryRepo.deleteOne(id);
  }
}
