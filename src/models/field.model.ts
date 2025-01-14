import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'fields',
  timestamps: true,
})
export class FieldModel extends Model {
  @Column(DataType.STRING)
  component!: string;

  @Column(DataType.STRING)
  defaultForStep!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}
