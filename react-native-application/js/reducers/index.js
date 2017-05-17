
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import user from './user';
import list from './list';
import home from './home';
import settings from './settings';

export default combineReducers({

  drawer,
  user,
  list,
  home,
  settings,
  cardNavigation,

});
