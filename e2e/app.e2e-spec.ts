import { FortuneCookiePage } from './app.po';

describe('fortune-cookie App', () => {
  let page: FortuneCookiePage;

  beforeEach(() => {
    page = new FortuneCookiePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
