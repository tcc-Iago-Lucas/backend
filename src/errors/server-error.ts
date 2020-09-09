export class ServerError extends Error {
  constructor () {
    super('Internal server Error')
    this.name = 'ServerError'
  }
}
