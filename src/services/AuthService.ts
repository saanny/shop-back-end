import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import AppError from '../utils/AppError'
import UsersRepository from '../components/users/repositories/UserMongoRepository'
import IUserRepository from '../components/users/repositories/IUserRepository'

const signToken = (id: string) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  )
}

export const createAndSendToken = (
  user: any,
  statusCode: any,
  res: Response
) => {
  const token = signToken(user?._id)

  user.password = undefined

  res.status(statusCode).send({
    status: 'success',
    token,
  })
}

const usersRepository: IUserRepository = new UsersRepository()

export async function protect(req: any, res: Response, next: NextFunction) {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new AppError('برای دسترسی به این صفحه باید وارد وبسایت شوید', 401)
    )
  }

  const decoded: any = jwt.decode(token)
  const freshUser: any = await usersRepository.findOne(decoded.id)

  if (!freshUser) {
    return next(new AppError('کاربر مربوط به این توکن پیدا نشد', 401))
  }
  req.user = freshUser

  next()
}

export function getMe(req: any, res: Response, next: NextFunction) {
  req.params.id = req.user?.id
  next()
}
