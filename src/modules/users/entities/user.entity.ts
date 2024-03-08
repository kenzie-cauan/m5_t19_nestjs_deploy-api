import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/utils';

export class User extends BaseEntity {
  public name: string;
  public email: string;

  @Exclude()
  public password: string;
}
