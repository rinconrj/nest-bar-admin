import { Injectable, NotFoundException } from '@nestjs/common';
import { Table } from './tables.model';
@Injectable()
export class TablesService {
  private tables: Table[] = [];
  insertTable(id: string, title: string, description?: string) {
    const newTable = new Table(id, title, description);
    this.tables.push(newTable);
    return newTable;
  }

  fetchTables() {
    return [...this.tables];
  }

  getTableById(title: string) {
    const table = this.tables.find((table) => table.title === title);
    if (!table) throw new NotFoundException();
    return { ...table };
  }
}
