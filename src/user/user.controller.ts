import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config.enum';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getUsers(): any {
    const db = this.configService.get(ConfigEnum.DB);
    const db_host = this.configService.get(ConfigEnum.DB_HOST);
    const db_domain = this.configService.get(ConfigEnum.DB_DOMAIN);
    console.log('db is', db, db_host, db_domain);
    return this.userService.getUsers();
  }
}
