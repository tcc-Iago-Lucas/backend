/* eslint-disable @typescript-eslint/method-signature-style */
import { AccountModel } from '../models/account'

export interface CreateAccountModel {
  name: string
  email: string
  password: string
}
export interface CreateAccount{
  create (account: CreateAccountModel): Promise<AccountModel>
}
