import { NextFunction, Request, Response } from 'express'
import { controller, httpPost } from 'inversify-express-utils'
import { inputValidator } from '@Utils/InputValidator'
import { inputCreateProduct } from './ValidationSchema'
import { AdminProductService } from './Service'
import { protect } from '@Services/AuthService'

@controller('/api/v1/admin/products')
export default class AdminProductController {
  constructor(private readonly AdminproductService: AdminProductService) {}

  @httpPost('/', protect, inputValidator(inputCreateProduct))
  public async createOne(req: Request, res: Response, next: NextFunction) {
    const product = await this.AdminproductService.createOne(req.body)

    res.status(200).json({
      status: 'success',
      data: {
        product,
        _metadata: {},
      },
    })
  }
}
