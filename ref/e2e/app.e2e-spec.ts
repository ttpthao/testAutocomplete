import { TestAutocompletePage } from './app.po';

describe('test-autocomplete App', function() {
  let page: TestAutocompletePage;

  beforeEach(() => {
    page = new TestAutocompletePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
