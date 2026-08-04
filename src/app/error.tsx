"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";
import SectionEyebrow from "@/components/section-eyebrow";
import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-[#f4f1e8] px-5 py-20 md:px-10">
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="space-y-5">
          <SectionEyebrow>Something went wrong</SectionEyebrow>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            An unexpected{" "}
            <span className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-transparent">
              error occurred
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-sm text-gray-600 md:text-base">
            This one is on my side, not yours. Try again — and if it keeps
            happening, get in touch and I&apos;ll take a look.
          </p>

          {error.digest && (
            <p className="font-mono text-xs text-gray-400">
              Reference: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            onClick={reset}
            size="lg"
            className="w-full rounded-full border-0 bg-gradient-to-r from-[#f97316] to-[#9b4819] text-white shadow-md hover:from-[#ea580c] hover:to-[#7c3a14] sm:w-auto"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full rounded-full border-black text-black sm:w-auto"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <p className="text-xs text-gray-500">
          Still stuck?{" "}
          <Link href="/contact" className="text-[#9b4819] underline">
            Report the issue
          </Link>
        </p>
      </div>
    </main>
  );
};

export default ErrorPage;
