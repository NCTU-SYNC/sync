import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import noop from 'lodash/noop';

type SetState<T> = Dispatch<SetStateAction<T>>;

const useStateWithCallback = <T extends unknown>(
  initialState: T,
  callback: Function = noop,
): [ T,  SetState<T>] => {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => callback(state), [ state ]);

  return [ state, setState ];
};

export default useStateWithCallback;
