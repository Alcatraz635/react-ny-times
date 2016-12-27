import * as actions from '../actions/NYTimesAppActions'

describe('actions', () => {
  it('should create an action to select a category', () => {
    const category = 'technology'
    const expectedAction = {
      type: actions.SELECT_CATEGORY,
      category
    }
    expect(actions.selectedCategory(category)).toEqual(expectedAction)
  })

  it('should create an action to select a category to invalidate', () => {
    const category = 'technology'
    const expectedAction = {
      type: actions.INVALIDATE_CATEGORY,
      category
    }
    expect(actions.invalidateCategory(category)).toEqual(expectedAction)
  })

  it('should create an action to request articles', () => {
    const category = 'technology'
    const expectedAction = {
      type: actions.REQUEST_ARTICLES,
      category
    }
    expect(actions.requestStories(category)).toEqual(expectedAction)
  })

  it('should create an action to select a date to filter by', () => {
    const date = 'Wed Dec 28 2016 00:00:00 GMT-0500 (EST)'
    const expectedAction = {
      type: actions.FILTER_DATE,
      date
    }
    expect(actions.selectFilterDate(date)).toEqual(expectedAction)
  })

  it('should create an action to select a variable to sort by', () => {
    const sortBy = 'Date'
    const expectedAction = {
      type: actions.SORT,
      sortBy
    }
    expect(actions.selectSortBy(sortBy)).toEqual(expectedAction)
  })

})
