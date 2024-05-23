import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('E-commerce example')
    .setDescription('The E-commerce API description')
    .setVersion('1.0')
    .addTag('e-commerce')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    credentials: true,
    origin: 'https://ecommerce-frontend-dusky.vercel.app',
    // origin: 'http://localhost:3000',
  });
  app.use(
    session({
      name: 'SESSION_ID',
      secret: `${process.env.EXPRESS_SECRET}`,
      resave: false,
      saveUninitialized: false,
      cookie: {
        // maxAge: 60000,
        sameSite: 'none',
        httpOnly: true,
        secure: true,
        partitioned: true,
      },
    }),
  );
  const port = process.env.PORT || 4000;
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
bootstrap();
