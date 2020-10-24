import { CreateAccount, CreateAccountModel , AccountModel, Encrypter , CreateAccountRepository } from './db-add-account-interfaces'
export class DbAddAccount implements CreateAccount {
  private readonly encrypter: Encrypter
  private readonly createAccountRepository: CreateAccountRepository
  constructor (encrypter: Encrypter, createAccountRepository: CreateAccountRepository) {
    this.encrypter = encrypter
    this.createAccountRepository = createAccountRepository
  }

  async create (accountData: CreateAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.createAccountRepository.create(Object.assign({},accountData, { password: hashedPassword }))
    return account
  }
}
