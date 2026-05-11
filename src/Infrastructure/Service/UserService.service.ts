import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {
  UserLoginResponseVO,
  UserLoginVO,
  UserSaveVO,
  UserUpdateVO,
  UserVO,
} from 'src/Communication/ViewObjects/User/UserVO';
import { User } from 'src/Core/Entities/User/User.entity';
import { IUserRepository } from 'src/Core/RepositoriesInterfaces/IUserRepository.interface';
import { IUserService } from 'src/Core/ServicesInterfaces/IUserService.interface';
import { ConstantsMessagesUser } from 'src/Helpers/ConstantsMessages/ConstantsMessages';
import { JwtPayload } from 'src/Helpers/CustomObjects/JwtPayload';
import { List } from 'src/Helpers/CustomObjects/List.Interface';
import { Result } from 'src/Helpers/CustomObjects/Result';
import { Task } from 'src/Helpers/CustomObjects/Task.Interface';

@Injectable()
export class UserService extends IUserService {
  private readonly _userRepo: IUserRepository;
  private readonly _mapper: Mapper;

  constructor(
    private readonly userRepo: IUserRepository,
    private readonly jwtService: JwtService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {
    super();
    this._mapper = this.mapper;
    this._userRepo = this.userRepo;
  }

  async CreateAsync(model: UserSaveVO): Task<Result<UserVO>> {
    try {
      if (!model?.email || !model?.name || !model?.password)
        return Result.Fail(
          ConstantsMessagesUser.ErrorRequiredFieldsWithPassword,
        );

      const existentUser = await this._userRepo.FindByEmailAsync(model.email);
      if (existentUser != null)
        return Result.Fail(ConstantsMessagesUser.ErrorEmailAlreadyExists);

      const user = this._mapper.map(model, UserSaveVO, User);
      user.passwordHash = await bcrypt.hash(model.password, 10);

      const saved = await this._userRepo.InsertAsync(user);
      if (saved.isFailed) return Result.Fail(ConstantsMessagesUser.ErrorCreate);

      const response = this._mapper.map(saved.value, User, UserVO);

      return Result.Ok(response);
    } catch (error) {
      return Result.Fail(ConstantsMessagesUser.ErrorCreate);
    }
  }

  async UpdateAsync(model: UserUpdateVO): Task<Result<UserVO>> {
    try {
      if (model.id < 0 || model.id == null)
        return Result.Fail(ConstantsMessagesUser.ErrorNotFound);

      if (!model?.email || !model?.name)
        return Result.Fail(ConstantsMessagesUser.ErrorRequiredFields);

      const existentUser = await this._userRepo.FindByEmailAsync(model.email);
      if (existentUser != null && existentUser.id !== model.id)
        return Result.Fail(ConstantsMessagesUser.ErrorEmailAlreadyExists);

      const userUpdate = this._mapper.map(model, UserUpdateVO, User);
      if (model.password)
        userUpdate.passwordHash = await bcrypt.hash(model.password, 10);

      const update = await this._userRepo.UpdateAsync(userUpdate);
      if (update.isFailed)
        return Result.Fail(ConstantsMessagesUser.ErrorUpdate);

      const response = this._mapper.map(update.value, User, UserVO);

      return Result.Ok(response);
    } catch (error) {
      return Result.Fail(ConstantsMessagesUser.ErrorUpdate);
    }
  }

  async LoginAsync(model: UserLoginVO): Task<Result<UserLoginResponseVO>> {
    try {
      if (!model?.email || !model?.password)
        return Result.Fail(ConstantsMessagesUser.ErrorLogin);

      const user = await this._userRepo.FindByEmailWithPasswordAsync(
        model.email,
      );
      if (user == null || !user.passwordHash)
        return Result.Fail(ConstantsMessagesUser.ErrorLogin);

      const isPasswordValid = await bcrypt.compare(
        model.password,
        user.passwordHash,
      );
      if (!isPasswordValid)
        return Result.Fail(ConstantsMessagesUser.ErrorLogin);

      const mappedUser = this._mapper.map(user, User, UserVO);
      const payload: JwtPayload = {
        idUser: user.id.toString(),
        email: user.email,
        name: user.name,
        roles: 'User',
      };

      const response: UserLoginResponseVO = {
        user: mappedUser,
        accessToken: await this.jwtService.signAsync(payload),
        tokenType: 'Bearer',
        expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
      };

      return Result.Ok(response);
    } catch (error) {
      return Result.Fail(ConstantsMessagesUser.ErrorLogin);
    }
  }

  async GetById(id: number): Task<Result<UserVO>> {
    try {
      if (id < 0 || id == null)
        return Result.Fail(ConstantsMessagesUser.ErrorNotFound);

      const user = await this._userRepo.FindByIdAsync(id);
      if (user == null) return Result.Fail(ConstantsMessagesUser.ErrorPrepare);

      const response = this._mapper.map(user, User, UserVO);

      return Result.Ok(response);
    } catch (error) {
      return Result.Fail(ConstantsMessagesUser.ErrorPrepare);
    }
  }

  async GetAll(): Task<Result<List<UserVO>>> {
    try {
      const list: List<User> = await this._userRepo.FindAllAsync();
      if (list == null) return Result.Fail(ConstantsMessagesUser.ErrorGetAll);

      const response = this._mapper.mapArray(list, User, UserVO);

      return Result.Ok(response);
    } catch (error) {
      return Result.Fail(ConstantsMessagesUser.ErrorGetAll);
    }
  }
}
