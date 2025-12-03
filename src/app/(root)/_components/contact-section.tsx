"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent successfully!", {
        description: "Thank you for your message! I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hiteshsolanki@gmail.com",
      href: "mailto:hiteshsolanki@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9004713782",
      href: "tel:+919004713782",
    },
  ];

  return (
    <section
      id="contact"
      className="w-full flex justify-center items-center py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-white fadeInDown-animation"
    >
      <div className="w-full max-w-6xl px-5 md:px-8 lg:px-10 space-y-10 md:space-y-12">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1 text-xs font-medium text-[#9b4819]">
            <Sparkles className="h-3 w-3" />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-semibold">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-[#f97316] to-[#9b4819] bg-clip-text text-transparent">
              Connect
            </span>
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-gray-600">
            Have a project in mind or want to collaborate? I&apos;d love to hear from
            you. Send me a message and I&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">
                Contact Information
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Link
                      key={index}
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        info.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                        <Icon className="h-5 w-5 text-[#9b4819]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-1">
                          {info.label}
                        </p>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-[#9b4819] transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </Link>
                  );
                })}

                {/* Social Links */}
                <div className="pt-2">
                  <p className="text-xs text-gray-500 mb-3 font-medium">
                    Connect on Social Media
                  </p>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      className="px-2 hover:bg-orange-50"
                      asChild
                    >
                      <Link
                        href="https://github.com/Hitesh-s0lanki"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src="/social/github.svg"
                          alt="GitHub"
                          height={24}
                          width={24}
                          className="transition-opacity"
                        />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-2 hover:bg-orange-50"
                      asChild
                    >
                      <Link
                        href="https://www.linkedin.com/in/hitesh-solanki-a058872a0/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src="/social/linkedin.svg"
                          alt="LinkedIn"
                          height={24}
                          width={24}
                          className="transition-opacity"
                        />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-2 hover:bg-orange-50"
                      asChild
                    >
                      <Link
                        href="https://leetcode.com/u/hitesh4623/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src="/social/leetcode.png"
                          alt="LeetCode"
                          height={22}
                          width={22}
                          className="transition-opacity"
                        />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Download */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 border border-orange-200/50">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Download Resume
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Want to know more about my experience? Download my resume.
              </p>
              <Button
                asChild
                className="w-full bg-[#9b4819] hover:bg-[#7c3915] text-white"
              >
                <Link
                  href="/Hitesh_Solanki_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Download PDF
                </Link>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 h-full">
            <div className="bg-white rounded-xl h-full p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">
                Send me a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="w-full"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2 h-full">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or just say hello..."
                    className="w-full h-[170px]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#9b4819] hover:bg-[#7c3915] text-white font-medium"
                    size="default"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
