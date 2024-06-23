import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo/mongo.service';
import { PostgresService } from './postgres/postgres.service';
import { User, UserSchema } from './mongo/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/bankapp'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [MongoService, PostgresService],
  exports: [MongoService, PostgresService],
})
export class DatabaseModule {}