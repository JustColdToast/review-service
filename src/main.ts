import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set up dynamoose region
  const dynamoose = require('dynamoose');
  dynamoose.aws.ddb.set(new dynamoose.aws.ddb.DynamoDB({'region': 'us-east-1'}));
  const port = process.env.PORT || 3000
  await app.listen(port);
}
bootstrap();
