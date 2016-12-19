import {
    SELECT_CATEGORY,
    INVALIDATE_CATEGORY,
    REQUEST_ARTICLES,
    FILTER_DATE,
    FILTER_CLEAR,
    RECEIVE_ARTICLES,
    CLOSE_DRAWER,
    OPEN_DRAWER,
} from '../actions/NYTimesAppActions.js'

export function selectedCategory( state = "home", action ) {
    switch ( action.type ) {
        case SELECT_CATEGORY:
            return action.category
        default:
            return state
    }
}

function articles( state = {
    isFetching: false,
    didInvalidate: false,
    articles: [ ]
}, action ) {
    switch ( action.type ) {
        case INVALIDATE_CATEGORY:
            return Object.assign({}, state, { didInvalidate: false })
        case REQUEST_ARTICLES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
        case RECEIVE_ARTICLES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                articles: action.articles,
                lastUpdated: action.receivedAt,
            })
        default:
            return state
    }
}

export function articlesByCategory( state = {}, action ) {
    switch ( action.type ) {
        case INVALIDATE_CATEGORY:
        case RECEIVE_ARTICLES:
        case REQUEST_ARTICLES:
            return Object.assign({}, state, {
                [ action.category ]: articles( state[action.category], action )
            })
        default:
            return state
    }
}

export function toggleDrawer( state = false, action ) {
    switch ( action.type ) {
        case CLOSE_DRAWER:
            return false
        case OPEN_DRAWER:
            return true
        default:
            return state
    }
}

export function categoryItems(state =
    [
        'home',
        'opinion',
        'world',
        'national',
        'politics',
        'upshot',
        'nyregion',
        'business',
        'technology',
        'science',
        'health',
        'sports',
        'arts',
        'books',
        'movies',
        'theater',
        'sundayreview',
        'fashion',
        'tmagazine',
        'food',
        'travel',
        'magazine',
        'realestate',
        'automobiles',
        'obituaries',
        'insider',
    ]
) {
    return state
}

export function dateFilteredArticles( state = {}, action){
  console.log(action);
  switch(action.type){
  case FILTER_DATE:
      console.log(action);
      return Object.assign({}, state, {
          filteredArticles: action.articles
      })
  case FILTER_CLEAR:
      return state
  default:
      return state
      }
}
