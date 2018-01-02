/* eslint no-trailing-spaces: "error" */
import {unique} from 'shared/util/function'
describe('Unique function', () => {
  it('unique basic array', () => {
    let result = unique([1, '1', 1, '1', '', undefined, null])
    expect(result).to.have.lengthOf(5)
  })

  it('unique object array', () => {
    let result = unique([{a: 1}, {b: 1}, {a: 1}])
    expect(result).to.have.lengthOf(2)
  })

  it('unique object array 2', () => {
    let result = unique([{a: 1, b: 1}, {b: 1, a: 1}, {a: 1}])
    expect(result).to.have.lengthOf(2)
  })

  it('unique muliple arguments', () => {
    let result = unique(1, 2, '1', [2, {a: 1}], {a: 1})
    expect(result).to.have.lengthOf(4)
  })
})
