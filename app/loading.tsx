import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Loading() {
  return (
    <div className="flex justify-center py-6">
      <ArrowPathIcon className="w-6 h-6 text-orange-700 animate-spin" />
    </div>
  );
}