import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/Core/Entities/User/User.entity';
import { IUserRepository } from 'src/Core/RepositoriesInterfaces/IUserRepository.interface';
import { ConstantsMessagesUser } from 'src/Helpers/ConstantsMessages/ConstantsMessages';
import { List } from 'src/Helpers/CustomObjects/List.Interface';
import { Result } from 'src/Helpers/CustomObjects/Result';
import { Task } from 'src/Helpers/CustomObjects/Task.Interface';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends IUserRepository {
  private readonly _userDbContext: Repository<User>;

  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userDbContext: Repository<User>,
  ) {
    super();
    this._userDbContext = this.userDbContext;
  }

  async InsertAsync(model: User): Task<Result<User>> {
    try {
      model.createdAt = new Date();
      model.updatedAt = new Date();
      model.disabledAt = null;
      model.email = model.email?.trim().toLowerCase();

      const result = await this._userDbContext.save(model);

      return Result.Ok(result);
    } catch (error) {
      return Result.Fail(ConstantsMessagesUser.ErrorInsert);
    }
  }

  async UpdateAsync(model: User): Task<Result<User>> {
    try {
      const user: User = await this.FindByIdAsync(model.id);
      if (user == null) return Result.Fail(ConstantsMessagesUser.ErrorFindById);

      user.name = model.name;
      user.email = model.email?.trim().toLowerCase();
      if (model.passwordHash) user.passwordHash = model.passwordHash;
      user.updatedAt = new Date();

      const saved = await this._userDbContext.save(user);

      return Result.Ok(saved);
    } catch (error) {
      return Result.Fail(ConstantsMessagesUser.ErrorUpdate);
    }
  }

  async FindByIdAsync(id: number): Task<User> {
    try {
      const user: User = await this._userDbContext.findOne({
        where: {
          disabledAt: IsNull(),
          id: id,
        },
      });

      return user;
    } catch (error) {
      return null;
    }
  }

  async FindByEmailAsync(email: string): Task<User> {
    try {
      const user: User = await this._userDbContext.findOne({
        where: {
          disabledAt: IsNull(),
          email: email?.trim().toLowerCase(),
        },
      });

      return user;
    } catch (error) {
      return null;
    }
  }

  async FindByEmailWithPasswordAsync(email: string): Task<User> {
    try {
      const user: User = await this._userDbContext
        .createQueryBuilder('user')
        .addSelect('user.passwordHash')
        .where('user.disabledAt IS NULL')
        .andWhere('LOWER(user.email) = :email', {
          email: email?.trim().toLowerCase(),
        })
        .getOne();

      return user;
    } catch (error) {
      return null;
    }
  }

  async FindAllAsync(): Task<List<User>> {
    try {
      const list: List<User> = await this._userDbContext.find({
        where: {
          disabledAt: IsNull(),
        },
      });

      return list;
    } catch {
      return null;
    }
  }
}
