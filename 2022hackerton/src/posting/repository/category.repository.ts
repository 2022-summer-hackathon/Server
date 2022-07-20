import { Repository } from 'typeorm';
import { CustomRepository } from 'src/global/decorate/custom.repository';
import Category from '../entity/category.entity';

@CustomRepository(Category)
export class CategoryRepository extends Repository<Category> {}
