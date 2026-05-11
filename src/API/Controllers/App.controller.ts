import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiExcludeEndpoint()
  @Get()
  getStatus() {
    return {
      success: true,
      message: 'API Hours Tracker rodando corretamente.',
      swagger: '/swagger',
    };
  }
}
