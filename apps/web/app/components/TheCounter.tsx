import { useState } from 'react'

type Props = {
  readonly initial: number
}

export default function TheCounter({ initial }: Props) {
  const [count, setCount] = useState(initial)

  const inc = () => {
    setCount((previousCount) => previousCount + 1)
  }

  const dec = () => {
    setCount((previousCount) => previousCount - 1)
  }

  return (
    <div className="inline-flex items-center gap-3 m-2">
      <span className="tabular-nums font-medium text-lg">{count}</span>
      <button
        className="icon-btn text-2xl px-2 leading-none"
        data-testid="dec-button"
        onClick={dec}
        type="button"
      >
        −
      </button>
      <button
        className="icon-btn text-2xl px-2 leading-none"
        data-testid="inc-button"
        onClick={inc}
        type="button"
      >
        +
      </button>
    </div>
  )
}
