import { Controller, Get, Req } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';

@Controller()
export class AppController {
  @ApiExcludeEndpoint()
  @Get()
  getStatus(@Req() req: Request) {
    const protocol = req.headers['x-forwarded-proto'] ?? req.protocol;
    const host = req.headers['x-forwarded-host'] ?? req.get('host');
    const baseUrl = `${protocol}://${host}`;

    return {
      success: true,
      message: 'API Hours Tracker rodando corretamente.',
      swagger: `${baseUrl}/swagger`,
      docs: `${baseUrl}/docs`,
    };
  }
}
