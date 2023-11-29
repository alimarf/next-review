"use client";

import { useIsclient } from "@/lib/hooks";
import { SearchableReview } from "@/lib/reviews";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

export default function SearchBox() {
  const router = useRouter();
  const isClient = useIsclient();
  const [query, setQuery] = useState("");
  const [debounceQuery] = useDebounce(query, 300);
  const [reviews, setReviews] = useState<SearchableReview[]>([]);

  useEffect(() => {
    if (debounceQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        const url = "api/search?query=" + encodeURIComponent(debounceQuery);
        const response = await fetch(url, { signal: controller.signal });
        const reviews = await response.json();
        setReviews(reviews);
      })();
      return () => controller.abort();
    } else {
      setReviews([]);
    }
  }, [debounceQuery]);

  const handleChange = (review: SearchableReview) => {
    router.push(`/reviews/${review.slug}`);
  };
  if (!isClient) {
    return null;
  }

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          placeholder="Search…"
          className="w-full px-2 py-1 border rounded"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Options className="absolute w-full py-1 bg-white">
          {reviews.map((review) => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate w-full ${
                    active ? "bg-orange-100" : ""
                  }`}
                >
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
