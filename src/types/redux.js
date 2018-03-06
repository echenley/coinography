// @flow

import type { Action } from './actions'
import type { State } from '../reducers'

export type { Action, State }
export type GetState = () => State
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => mixed
export type Dispatch = (action: Action | ThunkAction) => mixed
