import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(value => value === null ? '' : value)
        )
    }
}