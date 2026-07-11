import { useLingui } from '@lingui/react/macro'

type Props = {
  readonly onChange: React.ChangeEventHandler<HTMLInputElement>
  readonly onPressEnter: () => void
  readonly value?: string
}

export function TheInput({ onChange, onPressEnter, value }: Props) {
  const { t } = useLingui()

  return (
    <input
      autoComplete="off"
      className="px-4 py-2 w-[250px] text-center bg-transparent border rounded-sm border-gray-200 dark:border-gray-700 outline-hidden focus:border-teal-600 transition-colors"
      onChange={onChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter') onPressEnter()
      }}
      placeholder={t`What's your name?`}
      type="text"
      value={value}
    />
  )
}
