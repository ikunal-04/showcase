import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black transition-colors duration-300">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">Page Not Found</h2>
      <p className="text-lg mb-8 text-center px-4">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <Button>
            Go to Home
        </Button>
      </Link>
    </div>
  );
}