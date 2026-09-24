import { Clock, Plane, Wallet } from "lucide-react";
import { site } from "@/lib/site";
import { HeroBackground } from "./hero-background";
import { EnquiryForm } from "./enquiry/enquiry-form";
export function HeroSection() {
    return (
        <section id="search" className="relative scroll-mt-16 overflow-hidden bg-teal-800 text-white">
            {/* 3D globe, desktop only */}
            <HeroBackground />

            <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
                <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
                    {site.tagline}
                </h1>
                <p className="mt-4 max-w-xl text-lg text-teal-100">
                    Tell us where you&apos;re headed. A travel expert finds your fare and calls you back{" "}
                    {site.callbackPromise}.
                </p>

                <div className="mt-10">
                    <EnquiryForm />
                </div>

                <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-teal-100">
                    <li className="flex items-center gap-2">
                        <Plane className="size-4 text-marigold-300" /> Fares across many airlines
                    </li>
                    <li className="flex items-center gap-2">
                        <Clock className="size-4 text-marigold-300" /> Callback {site.callbackPromise}
                    </li>
                    <li className="flex items-center gap-2">
                        <Wallet className="size-4 text-marigold-300" /> No payment to get a quote
                    </li>
                </ul>
            </div>
        </section>
    );
}