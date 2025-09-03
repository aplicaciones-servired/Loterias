import { WarningIcon } from './warning'

export function Error ({ errorString }: { errorString: string }): JSX.Element {
  return (
    <section className='h-10'>
      <article className="">
        {(errorString !== '') &&
          <div className='flex gap-2'>
            <p className="text-center bg-red-600 text-white font-semibold p-2 rounded-md">
              <WarningIcon />
            </p>
            <p className="text-center bg-red-600 text-white font-semibold p-2 rounded-md">
              {errorString}
            </p>
          </div>
        }
      </article>
    </section>
  )
}
