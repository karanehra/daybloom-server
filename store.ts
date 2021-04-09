import WS from 'ws'

export default class ServerStore {
  private connections: WS[] = []
  constructor() {}

  public addClient(connection: WS) {
    this.connections.push(connection)
  }
}
