import configuration from './config/DB';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TablesModule } from './tables/tables.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { WorkersModule } from './workers/workers.module';
import { ItemsModule } from './items/items.module';
import { BussinesModule } from './bussines/bussines.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoPass = configService.get<string>('MONGO_PASS');
        return {
          uri: `mongodb+srv://metalork:${mongoPass}@cluster0.m1vhz.mongodb.net/nest?retryWrites=true&w=majority`,
        };
      },
      inject: [ConfigService],
    }),
    TablesModule,
    UsersModule,
    OrdersModule,
    WorkersModule,
    ItemsModule,
    BussinesModule,
  ],
})
export class AppModule {}
