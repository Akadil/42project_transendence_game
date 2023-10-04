import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * @brief This is the entry point of the application.
 *
 * @details THe middlawares are registered here. and also the password hashing is done here.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
