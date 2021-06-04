import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/interfaces/cat';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];
    create(cat: Cat) {
        this.cats.push(cat);
    }

    findAll(): Cat[] {
        return this.cats;
    }
}
