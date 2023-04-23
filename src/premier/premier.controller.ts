import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
} from '@nestjs/common';

@Controller('premier')
export class PremierController {
  @Get()
  findAll(): string {
    return 'Get';
  }

  @Post()
  create(@Body() body: any): string {
    return `Post: ${JSON.stringify(body)}`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any): string {
    return `Put ${id} and body: ${JSON.stringify(body)}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `Removed resource with ID ${id}`;
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() body: any): string {
    return `Patch with ID ${id} and body: ${JSON.stringify(body)}`;
  }
}
