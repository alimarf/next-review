"use client";

import { ActionError, createCommentAction } from "@/app/reviews/[slug]/action";
import { FormEvent, useState } from "react";

export interface CommentFormProps {
  slug: string;
  title: string;
}

interface SubmissionState {
  loading: boolean;
  error: ActionError | null;
}

export default function CommentForm({ slug, title }: CommentFormProps) {
  const [state, setState] = useState<SubmissionState>({ error: null, loading: false });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    setState({ loading: true, error: null });
    const form = event.currentTarget;
    const formData = new FormData(form);
    console.log('data: ', formData)
    const result = await createCommentAction(formData);
    if (result?.isError) {
      setState({ loading: false, error: result });
    } else {
      form.reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 px-3 py-3 mt-3 bg-white border rounded"
    >
      <p className="pb-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <input type="hidden" name="slug" value={slug} />
      <div className="flex">
        <label htmlFor="userField" className="w-32 shrink-0">
          Your name
        </label>
        <input
          name="user"
          id="userField"
          className="w-48 px-2 py-1 border rounded"
        />
      </div>
      <div className="flex">
        <label htmlFor="messageField" className="w-32 shrink-0">
          Your comment
        </label>
        <textarea
          id="messageField"
          name="message"
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      {Boolean(state.error) && <p className="text-red-700">{state.error.message}</p>}
      <button
        type="submit" disabled={state.loading}
        className="self-center w-32 px-2 py-1 bg-orange-800 rounded text-slate-50 hover:bg-orange-700 disabled:bg-slate-500 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
}
