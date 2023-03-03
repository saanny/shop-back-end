import { NextFunction, Request, Response } from 'express'
import { controller, httpGet } from 'inversify-express-utils'
import { FrontProductService } from '../Service'

@controller('/api/v1/front/products')
export default class ProductController {
  constructor(private readonly FrontproductService: FrontProductService) {}

  @httpGet('/:id')
  public async getOneById(req: Request, res: Response, next: NextFunction) {
    const product = await this.FrontproductService.getOneById({
      id: req.params.id,
    })

    res.status(200).json({
      status: 'success',
      data: {
        product,
        _metadata: {},
      },
    })
  }

  @httpGet('/')
  public async getAll(req: Request, res: Response, next: NextFunction) {
    const limitParam: any = req.query.limit
    const pageParam: any = req.query.page
    const { products, perPage, page, totalPages, totalItems } =
      await this.FrontproductService.getAll(limitParam, pageParam)

    res.status(200).json({
      status: 'success',
      data: {
        products,
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
