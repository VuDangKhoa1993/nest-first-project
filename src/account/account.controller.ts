import { Controller, Get, HostParam, Param } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Controller({ host: ':account.example.com' })
export class AccountController {
    @Get()
    getInfo(@HostParam('account') account: string) {
        return account;
    }

    @Get()
    async findAll() : Promise<any[]> {
        return [];
    }

    @Get(':id')
    findOne(@Param('id') id: string) : Observable<any> {
        return of(id);
    }
}
