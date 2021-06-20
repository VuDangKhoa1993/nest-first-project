import { Injectable } from '@nestjs/common';

@Injectable()
export class OptionsProviderService {
    get() {
        return {
            connection: 'DB name',
            purpose: 'testing'
        }
    }
}
