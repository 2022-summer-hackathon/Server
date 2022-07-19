import { Repository } from 'typeorm';
import { CustomRepository } from 'src/global/decorate/custom.repository';
import Genre from '../entity/genre.entity';

@CustomRepository(Genre)
export class GenreRepository extends Repository<Genre> {}
