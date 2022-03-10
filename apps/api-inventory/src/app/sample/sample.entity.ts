import {
  Column,
  Entity,
} from 'typeorm';

import { BaseEntity } from '@projects/entity';

@Entity()
export class Sample extends BaseEntity {
  @Column({ type: 'text' }) text: string;
  @Column({ type: 'numeric' }) number: number;
}
