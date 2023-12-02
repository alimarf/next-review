import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function CommentListSkeleton() {
  return (
    <ul className="mt-3 border rounded animate-pulse">
      {[1, 2, 3].map((index) => (
        <li key={index}
          className="px-3 py-2 border-b last:border-none odd:bg-orange-100">
          <div className="flex items-center gap-3 pb-1 text-slate-300">
            <UserCircleIcon className="w-6 h-6" />
            <div className="w-24 h-3 bg-gray-300 rounded" />
          </div>
          <p className="py-1">
            <div className="w-2/3 h-3 bg-gray-300 rounded" />
          </p>
        </li>
      ))}
    </ul>
  );
}