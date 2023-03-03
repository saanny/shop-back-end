import { protect } from '@Services/AuthService'
import { NextFunction, Response, Request } from 'express'
import { controller, httpPost } from 'inversify-express-utils'
import { AdminCategoryService } from './Service'

@controller('/api/v1/admin/category')
export default class AdminCategoryController {
  constructor(private readonly categoryService: AdminCategoryService) {}

  @httpPost('/', protect)
  public async createOneCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const category = await this.categoryService.createOne(req.body)

    res.status(200).json({
      status: 'success',
      data: {
        category,
        _metadata: {},
      },
    })
  }
}
