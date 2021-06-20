import { Observable, throwError } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError } from 'rxjs/operators';
import { BadGatewayException } from '@nestjs/common';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError(err => throwError(new BadGatewayException()))
        )
    }
}