import Link from 'next/link'

export default function accessDenied() {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <div className="rounded-xl bg-white px-40 py-20 shadow-2xl">
          <div className="flex flex-col items-center">
            <h2 className="text-8xl font-bold text-blue-600">403</h2>

            <h6 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> Access Denied
            </h6>

            <p className="mb-8 text-center text-gray-500 md:text-lg rounded-md">
               It's A Private Document. You don't have permission to access this page.
            </p>
            <Link href="/">
            <a
              className="bg-blue-100 px-6 py-2 rounded-xl text-sm font-semibold text-blue-800"
            >
              Get Home
            </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
