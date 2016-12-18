import { SELECT_CATEGORY, INVALIDATE_CATEGORY, REQUEST_ARTICLES, RECEIVE_ARTICLES } from '../actions/NYTimesAppActions.js'

export function selectedCategory( state = 'home', action ) {
    switch ( action.type ) {
        case SELECT_CATEGORY:
            return action.category
        default:
            return state
    }
}

function articles( state = {
  isFetching:false,
  didInvalidate:false,
  articles:[]
}, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
        return Object.assign({}, state, {didInvalidate:false})
    case REQUEST_ARTICLES:
      return Object.assign({}, state, {
        isFetching:true,
        didInvalidate:false
      })
    case RECEIVE_ARTICLES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        articles: action.articles,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export function articlesByCategory ( state={}, action){
  switch (action.type) {
    case INVALIDATE_CATEGORY:
    case RECEIVE_ARTICLES:
    case REQUEST_ARTICLES:
      return Object.assign({}, state, {
        [action.category]: articles(state[action.category], action)
      })
    default:
      return state
  }
}
