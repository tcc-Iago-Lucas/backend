import { CreateAccountModel } from '../../interfaces/create-account'
import { AccountModel } from '../../interfaces/accountModel'
export interface CreateAccountRepository{
  create (account: CreateAccountModel): Promise<AccountModel>
}
