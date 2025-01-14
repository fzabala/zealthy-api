import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'component-config',
  timestamps: true,
})
export class ComponentConfigModel extends Model {
  @Column(DataType.STRING)
  component!: string;

  @Column(DataType.ENUM('2', '3'))
  step!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}
