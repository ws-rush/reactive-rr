export type MetaDescriptor =
  | { title: string }
  | { charSet: string }
  | { name: string; content: string }
  | { property: string; content: string }
  | { httpEquiv: string; content: string }

export type MetaJson = readonly MetaDescriptor[]

export function Meta({ data }: { readonly data?: MetaJson | null }) {
  return (
    <>
      {data?.map((descriptor, index) => {
        if ('title' in descriptor) {
          return <title key={`title-${index}`}>{descriptor.title}</title>
        }

        if ('charSet' in descriptor) {
          return <meta key={`charset-${index}`} charSet={descriptor.charSet} />
        }

        if ('name' in descriptor) {
          return (
            <meta
              key={`name-${descriptor.name}-${index}`}
              name={descriptor.name}
              content={descriptor.content}
            />
          )
        }

        if ('property' in descriptor) {
          return (
            <meta
              key={`property-${descriptor.property}-${index}`}
              property={descriptor.property}
              content={descriptor.content}
            />
          )
        }

        return (
          <meta
            key={`http-equiv-${descriptor.httpEquiv}-${index}`}
            httpEquiv={descriptor.httpEquiv}
            content={descriptor.content}
          />
        )
      })}
    </>
  )
}
