"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

export default function PartnerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: "Chalzi partnership inquiry",
          message: message.trim(),
        }),
      });

      if (!response.ok) throw new Error("Message could not be sent");

      trackEvent("contact_form_submit", { form_location: "chalzi_page" });
      setName("");
      setEmail("");
      setMessage("");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-[#202132]/10 bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <h3 className="text-xl font-semibold">Start a conversation</h3>
        <p className="mt-2 text-sm leading-6 text-[#686a78]">
          Just three fields. No commitment.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="chalzi-name" className="text-sm font-medium">
            Name *
          </label>
          <Input
            id="chalzi-name"
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="h-11 border-[#202132]/20"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="chalzi-email" className="text-sm font-medium">
            Email *
          </label>
          <Input
            id="chalzi-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            className="h-11 border-[#202132]/20"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="chalzi-message" className="text-sm font-medium">
          What would you like to explore? *
        </label>
        <Textarea
          id="chalzi-message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell me about your brand, product, or pilot idea..."
          className="resize-y border-[#202132]/20"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="min-h-11 w-full bg-[#30355b] text-white hover:bg-[#242846] sm:w-auto sm:px-6"
      >
        {isSubmitting ? "Sending..." : "Send partnership inquiry"}
        {!isSubmitting && <ArrowRight className="size-4" aria-hidden="true" />}
      </Button>
      <p
        role="status"
        aria-live="polite"
        className={`text-sm ${status === "error" ? "text-red-700" : "text-[#3c6653]"}`}
      >
        {status === "success"
          ? "Thanks for reaching out. I’ll reply to you soon."
          : status === "error"
            ? "The message didn’t send. Please try again."
            : ""}
      </p>
    </form>
  );
}
