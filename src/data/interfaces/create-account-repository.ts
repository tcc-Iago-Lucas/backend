import { CreateAccountModel } from '../../domain/usecases/create-account'
import { AccountModel } from '../../domain/models/account'
export interface CreateAccountRepository{
  create (account: CreateAccountModel): Promise<AccountModel>
}
