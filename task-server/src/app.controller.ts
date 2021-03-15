import { Controller, Get,Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAllEntries(): any {
    return this.appService.getAllEntries();
  }
  @Get('users')
  findUsers(): string[] {
    return this.appService.getUsers();
  }
  @Get('types')
  findTypes(): string[] {
    return this.appService.getDistinctTypes();
  }
  @Get('time')
  findTime(): string[] {
    return this.appService.getDistinctTypes();
  }
  @Get('categories')
  findCategories(): string[] {
    return this.appService.getDistinctCategories();
  }
  @Get('users/:username')
  findUserEntry(@Param() params): any {
    return this.appService.getEntryPerUser(params.username);
  }
  @Get('entries/types/:typeId')
  findReportsPerType(@Param() params):any{
    return this.appService.getReportsPerType(params.typeId);
  }
  @Get('entries/categories/:categoryId')
  findReportsPerCategory(@Param() params):any{
    return this.appService.getReportsPerCategory(params.categoryId);
  }

}
