import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'title',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column('decimal', {
    precision: 12,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    length: 10,
    nullable: false,
  })
  zipcode: string;

  @Column({
    nullable: false,
  })
  seller: string;

  @Column({
    name: 'thumbnailHd',
    length: 300,
    nullable: false,
  })
  thumbnailHd: string;

  @Column()
  activateDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
