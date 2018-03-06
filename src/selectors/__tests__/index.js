import * as selectors from '../index'

describe('selectors', () => {
  it('exports correct selectors', () => {
    expect(selectors).toMatchSnapshot()
  })
})
