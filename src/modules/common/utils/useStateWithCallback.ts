import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type ReturnType<S> = [S, Dispatch<SetStateAction<S>>];

function useStateWithCallback<S>(initialState: S, callback: Function): ReturnType<S> {
  const [state, setState] = useState<S | typeof initialState>(initialState);

  useEffect(() => callback(state), [state, callback]);

  return [state, setState];
}

export default useStateWithCallback;
