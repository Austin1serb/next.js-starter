"use client"

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex h-screen items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold text-red-500">Something went wrong!</h1>
        <p className="text-gray-600">{error.message}</p>
        <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white" onClick={() => reset()}>
          Try Again
        </button>
      </div>
    </div>
  )
}
