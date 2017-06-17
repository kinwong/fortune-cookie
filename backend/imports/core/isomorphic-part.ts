export abstract class IsomorphicPart {
  public start(): void {
    if ( Meteor.isClient) {
      this.startClient();
    } else {
      this.startServer();
    }
  }
  protected abstract startClient(): void;
  protected abstract startServer(): void;
}
