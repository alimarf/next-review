import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews, searchReviews } from "@/lib/reviews";
import Image from "next/image";
import PaginationBar from "@/components/PaginationBar";
import SearchBox from "@/components/SearchBox";

interface ReviewPageProps {
  searchParams: { page?: string };
}

export const metadata = {
  title: "Reviews",
};

const PAGE_SIZE = 10;

export default async function ReviewsPage({ searchParams }: ReviewPageProps) {
  const page = parsePageParam(searchParams.page);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);


  return (
    <>
      <Heading>Reviews</Heading>
      <div className="flex justify-between pb-3">
        <PaginationBar href="/reviews" page={page} pageCount={pageCount} />
        <SearchBox />
      </div>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review, index) => (
          <li
            key={review.slug}
            className="bg-white border rounded shadow hover:shadow-xl w-80"
          >
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                priority={index === 0}
                alt=""
                width="320"
                height="180"
                className="mb-2 rounded-t"
              />
              <h2 className="py-1 font-semibold text-center font-orbitron">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function parsePageParam(paramValue: string): number {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}
