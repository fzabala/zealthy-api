import { STEPS } from '@/constants/steps.constant';
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
})
export class UserModel extends Model {
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  about?: string;

  @Column(DataType.STRING)
  street?: string;

  @Column(DataType.STRING)
  city?: string;

  @Column(DataType.STRING)
  state?: string;

  @Column(DataType.STRING)
  zip?: string;

  @Column(DataType.DATEONLY)
  birthDate?: Date;

  @Column(DataType.ENUM(STEPS['STEP-2'], STEPS['STEP-3'], STEPS.DONE))
  progress?: STEPS;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}
