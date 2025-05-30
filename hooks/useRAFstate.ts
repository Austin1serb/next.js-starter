import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"

export const useRAFstate = <S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
  const frame = useRef(0)
  const [state, setState] = useState(initialState)

  const setRafState = useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(frame.current)

    frame.current = requestAnimationFrame(() => {
      setState(value)
    })
  }, [])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return [state, setRafState]
}
