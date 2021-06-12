import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';


// class middleware 
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('request ...');
        next();
    }
}


// Funtional middleware 
export function logger(req: Request, res: Response, next: NextFunction) {
    console.log('request. ...');
    next();
}