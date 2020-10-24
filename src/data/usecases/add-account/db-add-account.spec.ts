import { Encrypter, CreateAccountModel, AccountModel, CreateAccountRepository } from './db-add-account-interfaces'
import { DbAddAccount } from './db-add-account'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}
const makeCreateAccountRepository = (): CreateAccountRepository => {
  class CreateAccountRepositoryStub implements CreateAccountRepository {
    async create (account: CreateAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      }))
    }
  }
  return new CreateAccountRepositoryStub()
}
interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  createAccountRepositoryStub: CreateAccountRepository
}
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const createAccountRepositoryStub = makeCreateAccountRepository()
  const sut = new DbAddAccount(encrypterStub,createAccountRepositoryStub)
  return {
    sut,
    createAccountRepositoryStub,
    encrypterStub
  }
}
describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { encrypterStub,sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.create({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
  test('Should throw if Encrypter throws', async () => {
    const { encrypterStub,sut } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })
    await expect(promise).rejects.toThrow()
  })
  test('Should call createAccountRepository with correct values', async () => {
    const { createAccountRepositoryStub,sut } = makeSut()
    const createSpy = jest.spyOn(createAccountRepositoryStub, 'create')
    await sut.create({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })
    expect(createSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })
  test('Should throw if createAccountRepository throws', async () => {
    const { createAccountRepositoryStub,sut } = makeSut()
    jest.spyOn(createAccountRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })
    await expect(promise).rejects.toThrow()
  })
  test('Should return an account on sucess', async () => {
    const { sut } = makeSut()
    const account = await sut.create({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })
})
