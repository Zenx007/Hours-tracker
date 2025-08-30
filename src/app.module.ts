import { Module } from '@nestjs/common';
import { AddControllers } from './API/Extensions/AddControllers';
import { AddProfiles } from './API/Extensions/AddProfiles';
import AddProviders from './API/Extensions/AddProviders';
import RepositoriesStartup from './API/Extensions/AddRepositories';
import ServicesStartup, { AllServicesInjects } from './API/Extensions/AddService';
import { AppService } from './Infrastructure/Service/app.service';
import { DatabaseModule } from './Infrastructure/Database/database.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [DatabaseModule,
  AutomapperModule.forRoot({
      strategyInitializer: classes(),
    })
  ],
  controllers: [...AddControllers],
  providers: [
    AppService,
    ...AllServicesInjects,
    ...AddProviders,
    ...AddProfiles,
    ...RepositoriesStartup,
    ...ServicesStartup
  ],
  exports: [
    ...AddProfiles,
    ...ServicesStartup,
    ...AddProviders,
    ...RepositoriesStartup
  ]
})
export class AppModule {}
