import { Inject, Injectable, Optional } from '@nestjs/common';

// This service is using custom provider (HTTP_OPTIONS) 
// and also used constructor-based injection as a provider
// @Injectable()
// export class HttpService<T> {
//     constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {
//     }
// }

// This service is not only using custom provider (HTTP_OPTIONS) but also using property-based injection
// warning: We should only use property-based injection if it is extending an another provider.
@Injectable()
export class HttpService<T> {
    @Inject('HTTP_OPTIONS') 
    private readonly httpClient: T 
 
    constructor() {
    }
}