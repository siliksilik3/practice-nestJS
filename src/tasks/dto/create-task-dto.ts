import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
// validatori https://github.com/typestack/class-validator
/* obazatelno dobavitj v main.ts app.useGlobalPipes(new ValidationPipe());
dobavitj peret listener port */
