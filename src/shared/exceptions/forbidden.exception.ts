import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
    constructor() {
        super({
            status: HttpStatus.FORBIDDEN,
            message: 'This is a custom exception message'
        }, HttpStatus.FORBIDDEN)
    }
}