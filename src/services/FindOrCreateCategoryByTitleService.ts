import { getRepository } from 'typeorm';
import Category from '../models/Category';

class FindOrCreateCategoryByTitleService {
  public async execute(title: string): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const category = await categoriesRepository.findOne({
      where: { title },
    });

    if (category) {
      return category;
    }

    const categoryCreated = new Category();
    categoryCreated.title = title;

    await categoriesRepository.save(categoryCreated);

    return categoryCreated;
  }
}

export default FindOrCreateCategoryByTitleService;
