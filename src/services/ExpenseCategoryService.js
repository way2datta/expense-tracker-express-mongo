import ExpenseCategory from '../models/ExpenseCategory';

export default class ExpenseCategoryService {
  async create(entity) {
    delete entity.createdAt;
    const category = new ExpenseCategory(entity);
    await category.save();
    return category;
  }

  async getAll() {
    return await ExpenseCategory.find().sort({ updatedAt: -1 });
  }

  async getPaginated(request) {
    const pageNo = parseInt(request.query.pageNo);
    const pageSize = parseInt(request.query.pageSize);
    const query = {};

    if (pageNo < 0) {
      const customResponse = { error: true, message: 'invalid page number, should start with 1' };
      return request.json(customResponse);
    }

    query.skip = pageSize * (pageNo);
    query.limit = pageSize;

    const datasource = await ExpenseCategory.find({}, {}, query)
      .sort({ updatedAt: -1 });

    const totalSize = await this.getCount();

    const totalPages = Math.ceil(totalSize / pageSize);

    return {
      datasource,
      totalPages,
      pageNo,
      pageSize,
    };
  }

  async getCount() {
    return await ExpenseCategory.count();
  }

  async getById(id) {
    return await ExpenseCategory.findById(id);
  }

  async update(id, entity) {
    delete entity.createdAt;
    delete entity.updatedAt;
    const category = await ExpenseCategory.findById(id);
    if (!category) {
      throw 'ExpenseCategory not found';
    }
    Object.assign(category, entity);
    await category.save();
    return category;
  }

  async delete(id) {
    await ExpenseCategory.findByIdAndRemove(id);
  }
}
