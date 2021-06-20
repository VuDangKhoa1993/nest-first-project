import { Observable, of } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) : Observable<any> {
        const isCached = true;
        if(isCached) {
            return of([]);
        }
        return next.handle();
    }
}