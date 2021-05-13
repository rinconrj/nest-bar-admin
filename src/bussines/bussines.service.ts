import { Injectable } from '@nestjs/common';

@Injectable()
export class BussinesService {
  create(createBussineDto) {
    return 'This action adds a new bussine';
  }

  findAll() {
    return `This action returns all bussines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bussine`;
  }

  update(id: number, updateBussineDto) {
    return `This action updates a #${id} bussine`;
  }

  remove(id: number) {
    return `This action removes a #${id} bussine`;
  }
}
