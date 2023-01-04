import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FeatureService } from './feature/feature.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private featureService: FeatureService,
  ) {}

  @Get('/dbconfig')
  getLDbConfig(): string {
    return this.featureService.getLDbConfig();
  }
}
