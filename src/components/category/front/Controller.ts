import { NextFunction, Response, Request } from 'express'
import { controller, httpGet } from 'inversify-express-utils'
import { FrontCategoryService } from './Service'

@controller('/api/v1/front/category')
export class FrontCategoryController {
  constructor(private readonly categoryService: FrontCategoryService) {}

  @httpGet(':/id')
  public async getOneById(req: Request, res: Response, next: NextFunction) {
    const category = await this.categoryService.getOneById(req.body.id)

    res.status(200).json({
      status: 'success',
      data: {
        category,
        _metadata: {},
      },
    })
  }
  @httpGet('/')
  public async getAll(req: Request, res: Response, next: NextFunction) {
    const limitParam: any = req.query.limit
    const pageParam: any = req.query.page
    const { categories, perPage, page, totalPages, totalItems } =
      await this.categoryService.getAll(limitParam, pageParam)

    res.status(200).json({
      status: 'success',
      data: {
        categories,
        _metadata: {
          page,
          perPage,
          totalPages,
          totalItems,
        },
      },
    })
  }
}
