import { Repository } from 'typeorm';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidateCreate,
  ValidateUpdate,
} from '@projects/validation';

import { SampleDTO } from './sample.dto';
import { Sample } from './sample.entity';

@ApiTags(SampleController.name)
@Controller()
export class SampleController {
  constructor(
    @InjectRepository(Sample) private sampleRepo: Repository<Sample>
  ) {}

  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @Get('samples')
  findAll() {
    return this.sampleRepo.find();
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @Get('sample/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.sampleRepo.findOne(id);
  }

  @ApiCreatedResponse()
  @ApiInternalServerErrorResponse()
  @Post('sample')
  save(@Body(ValidateCreate) body: SampleDTO) {
    return this.sampleRepo.save(body);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @Patch('sample/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdate) body: SampleDTO
  ) {
    return this.sampleRepo.update(id, body);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @Delete('sample/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.sampleRepo.delete(id);
  }
}
