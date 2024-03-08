import { Exclude, Type } from 'class-transformer';
import { User } from 'src/modules/users/entities';
import { BaseEntity } from 'src/utils';

export class Music extends BaseEntity {
  public name: string;
  public album?: string | undefined | null;
  public genre: string;
  public author: string;

  @Exclude()
  public userId: string;

  @Type(() => User)
  public user: User;
}
