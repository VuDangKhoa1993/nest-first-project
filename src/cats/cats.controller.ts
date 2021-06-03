import { Body, Controller, Get, Header, HttpCode, Param, Post, Redirect, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from 'src/models/dtos/create-cat.dto';

@Controller('cats')
export class CatsController {
    @Get()
    findAll(@Req() req: Request): string {
        return 'This action return all cats';
    }

    @Get('ab*cd')
    findAllCats(): string {
        return 'This action uses wildcards path';
    }

    @Get()
    @HttpCode(204)
    @Header('Cache-Control', 'none')
    @Redirect('http://nestjs.com', 301)
    findTest(): string {
        return 'This action uses @StatusCode() decorators';
    }

    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} cat`;
    }

    @Get(':id')
    findOtherOne(@Param('id') id: string ) : string {
        return `This action return a #${id} cat`;
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        return 'This action adds a new cat'
    }
}
