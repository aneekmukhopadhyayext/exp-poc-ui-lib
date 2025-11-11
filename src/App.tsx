export default function App() {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 gap-6'>
      <h1 className='text-3xl font-bold text-gray-800'>UI Sandbox Library</h1>
      <div className='bg-white p-8 rounded-lg shadow-md max-w-2xl text-center'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Component Library Documentation
        </h2>
        <p className='text-gray-600 mb-6'>
          This is a React UI component library built with Vite, TypeScript, and Tailwind CSS v4.
        </p>
        <div className='space-y-4'>
          <p className='text-gray-700 font-medium'>
            To view and interact with the component library, please visit Storybook:
          </p>
          <a
            href='http://localhost:6006'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium'
          >
            Open Storybook
          </a>
          <p className='text-sm text-gray-500 mt-4'>
            If Storybook is not running, start it with:{' '}
            <code className='bg-gray-100 px-2 py-1 rounded text-gray-800'>npm run storybook</code>
          </p>
        </div>
      </div>
    </div>
  )
}