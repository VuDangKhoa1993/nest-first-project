import { ValidationPipe } from './../shared/pipes/validation.pipe';
import { Body, Controller, Delete, Get, Header, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Redirect, Req } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from 'src/cats/dtos';
import { ForbiddenException } from 'src/shared/exceptions/forbidden.exception';
import { UsePipes } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/shared/custom-decorators/roles.decorator';
@Controller('cats')
@UseGuards(RoleGuard)
export class CatsController {

    @Get()
    async findAllCats(@Query() query: ListAllEntities) {
        // throw new HttpException({
        //     status: HttpStatus.FORBIDDEN, 
        //     message: 'This is a custom message'
        // }, HttpStatus.FORBIDDEN)
        throw new ForbiddenException(); // using a custom exception
    }

    @Get()
    findAll(@Query() query: ListAllEntities): string {
        return `This action returns all cats (limit: ${query.limit} items)`;
    }

    @Get(':id')
    findOne(
        @Param('id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string
    ): string {
        return `This action returns a #${id} cat`;
    }

    @Post()
    // @UsePipes(new ValidationPipe()) // using method-based pipe
    @Roles('admin')
    async create(
        @Body(new ValidationPipe()) // using parameter-based pipe 
        createCatDto: CreateCatDto
    ) {
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
