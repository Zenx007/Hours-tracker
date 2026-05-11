import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import {
  UserLoginResponseVO,
  UserLoginVO,
  UserSaveVO,
  UserUpdateVO,
  UserVO,
} from 'src/Communication/ViewObjects/User/UserVO';
import { IUserService } from 'src/Core/ServicesInterfaces/IUserService.interface';
import { JwtAuthGuard } from 'src/API/Guards/JwtAuthGuard';
import { ConstantsMessagesUser } from 'src/Helpers/ConstantsMessages/ConstantsMessages';
import { ApiResponse } from 'src/Helpers/CustomObjects/ApiResponse.interface';
import { List } from 'src/Helpers/CustomObjects/List.Interface';
import { StatusCode, StatusCodes } from 'src/Helpers/StatusCode/StatusCode';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private readonly _userService: IUserService) {}

  @ApiOperation({ summary: 'GetAll - Lista todos os usuarios' })
  @ApiBearerAuth('authorization')
  @UseGuards(JwtAuthGuard)
  @Get('GetAll')
  async GetAllAsync(@Res() res: Response, @Req() req: Request) {
    const response = new ApiResponse<List<UserVO>>();
    try {
      const list = await this._userService.GetAll();
      if (list.isFailed) {
        response.success = false;
        response.message = list.errors.toString();
        return StatusCode(res, StatusCodes.STATUS_404_NOT_FOUND, response);
      }

      response.success = true;
      response.object = list.value;

      return StatusCode(res, StatusCodes.STATUS_200_OK, response);
    } catch (error) {
      response.success = false;
      response.message = ConstantsMessagesUser.ErrorGetAll;
      return StatusCode(
        res,
        StatusCodes.STATUS_500_INTERNAL_SERVER_ERROR,
        response,
      );
    }
  }

  @ApiOperation({ summary: 'Create - Cria um novo usuario' })
  @Post('Create')
  async CreateAsync(
    @Res() res: Response,
    @Req() req: Request,
    @Body() model: UserSaveVO,
  ) {
    const response = new ApiResponse<UserVO>();
    try {
      const result = await this._userService.CreateAsync(model);
      if (result.isFailed) {
        response.object = null;
        response.message = result.errors.toString();
        response.success = false;

        return StatusCode(res, StatusCodes.STATUS_400_BAD_REQUEST, response);
      }

      response.object = result.value;
      response.success = true;

      return StatusCode(res, StatusCodes.STATUS_201_CREATED, response);
    } catch (error) {
      response.object = null;
      response.message = ConstantsMessagesUser.ErrorCreate;
      response.success = false;

      return StatusCode(
        res,
        StatusCodes.STATUS_500_INTERNAL_SERVER_ERROR,
        response,
      );
    }
  }

  @ApiOperation({ summary: 'Login - Faz login pelo e-mail e senha' })
  @Post('Login')
  async LoginAsync(
    @Res() res: Response,
    @Req() req: Request,
    @Body() model: UserLoginVO,
  ) {
    const response = new ApiResponse<UserLoginResponseVO>();
    try {
      const result = await this._userService.LoginAsync(model);
      if (result.isFailed) {
        response.object = null;
        response.message = result.errors.toString();
        response.success = false;

        return StatusCode(res, StatusCodes.STATUS_401_UNAUTHORIZED, response);
      }

      response.object = result.value;
      response.success = true;

      return StatusCode(res, StatusCodes.STATUS_200_OK, response);
    } catch (error) {
      response.object = null;
      response.message = ConstantsMessagesUser.ErrorLogin;
      response.success = false;

      return StatusCode(
        res,
        StatusCodes.STATUS_500_INTERNAL_SERVER_ERROR,
        response,
      );
    }
  }

  @ApiOperation({ summary: 'Prepare - Metodo que prepara um usuario' })
  @ApiBearerAuth('authorization')
  @UseGuards(JwtAuthGuard)
  @Get('Prepare')
  async PrepareAsync(
    @Res() res: Response,
    @Req() req: Request,
    @Query('id') id: number,
  ) {
    const response = new ApiResponse<UserVO>();
    try {
      const result = await this._userService.GetById(id);

      if (result.isFailed) {
        response.object = null;
        response.message = result.errors.toString();
        response.success = false;

        return StatusCode(res, StatusCodes.STATUS_400_BAD_REQUEST, response);
      }

      response.object = result.value;
      response.success = true;

      return StatusCode(res, StatusCodes.STATUS_200_OK, response);
    } catch (error) {
      response.message = ConstantsMessagesUser.ErrorPrepare;
      response.object = null;
      response.success = false;

      return StatusCode(res, StatusCodes.STATUS_400_BAD_REQUEST, response);
    }
  }

  @ApiOperation({ summary: 'Update - Metodo que atualiza um usuario' })
  @ApiBearerAuth('authorization')
  @UseGuards(JwtAuthGuard)
  @Post('Update')
  async UpdateAsync(
    @Res() res: Response,
    @Req() req: Request,
    @Body() model: UserUpdateVO,
  ) {
    const response = new ApiResponse<UserVO>();
    try {
      const result = await this._userService.UpdateAsync(model);

      if (result.isFailed) {
        response.object = null;
        response.message = result.errors.toString();
        response.success = false;

        return StatusCode(res, StatusCodes.STATUS_400_BAD_REQUEST, response);
      }

      response.object = result.value;
      response.success = true;

      return StatusCode(res, StatusCodes.STATUS_200_OK, response);
    } catch (error) {
      response.object = null;
      response.message = ConstantsMessagesUser.ErrorUpdate;
      response.success = false;

      return StatusCode(
        res,
        StatusCodes.STATUS_500_INTERNAL_SERVER_ERROR,
        response,
      );
    }
  }
}
