import * as actions from '../index'

describe('actions', () => {
  it('exports correct actions', () => {
    expect(actions).toMatchSnapshot()
  })
})
