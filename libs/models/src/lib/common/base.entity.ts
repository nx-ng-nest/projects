import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ICommonFields } from '@projects/interface';

import {
  BooleanColumn,
  TextColumn,
} from './columns';

export class BaseEntity implements ICommonFields {
  @PrimaryGeneratedColumn() id: number;
  @CreateDateColumn() createdAt?: Date;
  @UpdateDateColumn() updatedAt?: Date;
  @DeleteDateColumn() deletedAt?: Date;
  @BooleanColumn({ required: false, default: false }) selected?: boolean;
  @BooleanColumn({ required: false, default: false }) active?: boolean;

  @TextColumn({ unique: true, required: false })
  id1?: string;
  @TextColumn({ unique: true, required: false })
  id2?: string;
  @TextColumn({ unique: true, required: false })
  id3?: string;
}
