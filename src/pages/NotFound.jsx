import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="content-container py-space-xl text-center min-h-[50vh] flex flex-col items-center justify-center gap-space-sm">
      <span className="font-display-lg text-primary">404</span>
      <h1 className="font-headline-lg text-on-surface">This route isn't in the fleet.</h1>
      <Link to="/" className="font-label-lg text-secondary hover:underline">
        Back to home
      </Link>
    </div>
  )
}
