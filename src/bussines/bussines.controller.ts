import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BussinesService } from './bussines.service';

@Controller('bussines')
export class BussinesController {
  constructor(private readonly bussinesService: BussinesService) {}

  @Post()
  create(@Body() createBussineDto) {
    return this.bussinesService.create(createBussineDto);
  }

  @Get()
  findAll() {
    return this.bussinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bussinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBussineDto) {
    return this.bussinesService.update(+id, updateBussineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bussinesService.remove(+id);
  }
}
