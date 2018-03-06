// @flow

import type { Action } from './actions'
import type { State } from '../reducers'

export type { Action, State }
export type GetState = () => State
export type ThunkAction<R> = (dispatch: Dispatch, getState: GetState) => R
export type Dispatch = {
  <A: Action>(action: A): A,
  <R>(thunk: ThunkAction<R>): R,
}
