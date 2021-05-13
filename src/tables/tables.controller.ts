import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TablesService } from './tables.service';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesServices: TablesService) {}
  @Post()
  addTable(
    @Body('title') title: string,
    @Body('description') description: string,
  ): any {
    return this.tablesServices.insertTable(
      String(new Date().getTime()),
      title,
      description,
    );
  }

  @Get()
  fetchTables(): any {
    return this.tablesServices.fetchTables();
  }

  @Get(':title')
  getTableById(@Param('title') title: string): any {
    return this.tablesServices.getTableById(title);
  }
}
