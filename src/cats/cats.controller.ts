import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put, Query, Redirect, Req } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from 'src/cats/dtos';
@Controller('cats')
export class CatsController {
    @Get()
    findAll(@Query() query: ListAllEntities): string {
        return `This action returns all cats (limit: ${query.limit} items)`;
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `This action returns a #${id} cat`;
    }

    @Post()
    create(@Body() createCatDto: CreateCatDto) {
        return 'This action adds a new cat';
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}
