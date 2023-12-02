import { Metadata } from "next";
import Heading from "../../../components/Heading";
import Image from "next/image";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

import { getReview, getSlugs } from "@/lib/reviews";
import ShareLinkButton from "@/components/ShareLinkButton";
import { notFound } from "next/navigation";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import { Suspense } from "react";
import CommentListSkeleton from "@/components/CommentListSkeleteon";

export const revalidate = 30;

interface ReviewPageParams {
  slug: string;
}

interface ReviewPageProps {
  params: ReviewPageParams;
}

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: { slug },
}: ReviewPageProps): Promise<Metadata> {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return {
    title: review.title,
  };
}

export default async function ReviewPage({
  params: { slug },
}: ReviewPageProps) {
  // simulate delay:
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const review = await getReview(slug);

  if (!review) {
    notFound();
  }
  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="pb-3 font-semibold">{review.subtitle}</p>

      <div className="flex items-baseline gap-3">
        <p className="pb-2 italic">{review.date}</p>
        <ShareLinkButton />
      </div>
      <Image
        src={review.image}
        width="640"
        height="360"
        className="mb-2 rounded"
        alt={""}
        priority
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="max-w-screen-sm prose prose-slate"
      />
      <section className="max-w-screen-sm py-3 mt-3 border-t border-dashed">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
          Comments
        </h2>
        <CommentForm slug={review.slug} title={review.title} />
        <Suspense fallback={<CommentListSkeleton />}>
          <CommentList slug={review.slug} />
        </Suspense>
      </section>
    </>
  );
}
