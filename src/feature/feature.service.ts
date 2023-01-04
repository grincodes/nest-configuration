import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
interface DatabaseConfig {
  host: string;
  port: number;
}

@Injectable()
export class FeatureService {
  constructor(private configService: ConfigService) {}
  // get an environment variable
  dbUser = this.configService.get<string>('DATABASE_USER');

  // get a custom configuration value
  dbHost = this.configService.get<string>('database.host');

  dbConfig = this.configService.get<DatabaseConfig>('database');
  _dbConfig = this.configService.get('database');

  // you can now use `dbConfig.port` and `dbConfig.host`
  port = this.dbConfig.port;
  // use "localhost" when "database.host" is not defined
  db_Host = this.configService.get<string>('database.host', 'localhost');
  getDbUser() {
    return this.dbUser;
  }

  getDbHost() {
    return this.dbHost;
  }

  getLDbConfig() {
    return this._dbConfig;
  }
}
