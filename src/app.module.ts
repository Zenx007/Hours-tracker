import { Module } from '@nestjs/common';
import { AddControllers } from './API/Extensions/AddControllers';
import { AddProfiles } from './API/Extensions/AddProfiles';
import AddProviders from './API/Extensions/AddProviders';
import RepositoriesStartup from './API/Extensions/AddRepositories';
import ServicesStartup, {
  AllServicesInjects,
} from './API/Extensions/AddService';
import { AppService } from './Infrastructure/Service/app.service';
import { DatabaseModule } from './Infrastructure/Database/database.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './API/Guards/JwtAuthGuard';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'hours-tracker-development-secret',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
      },
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [...AddControllers],
  providers: [
    AppService,
    JwtAuthGuard,
    ...AllServicesInjects,
    ...AddProviders,
    ...AddProfiles,
    ...RepositoriesStartup,
    ...ServicesStartup,
  ],
  exports: [
    ...AddProfiles,
    ...ServicesStartup,
    ...AddProviders,
    ...RepositoriesStartup,
  ],
})
export class AppModule {}
