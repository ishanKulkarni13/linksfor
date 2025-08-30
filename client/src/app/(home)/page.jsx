import { auth } from "@/auth";
import React, { Suspense } from "react";
import styles from "./home.module.css";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

async function HeroActions() {
  const session = await auth();
  const user = session?.user;
  return (
    <>
      {!user ? (
        <div className={styles.heroActions}>
          <Link className={styles.getStarted} href="/login">
            Get started
          </Link>
          <Link className={styles.login} href="/login">
            Login
          </Link>
        </div>
      ) : (
        <Link
          className={styles.adminConsole}
          href="/admin/tree/edit/appearance"
        >
          Admin Console
        </Link>
      )}
    </>
  );
}

function HeroActionsSkeleton() {
  return (
    <Skeleton
      className={`h-[51px] w-48 rounded-full  bg-[var(--color-surface-1)]  flex justify-center items-center ${styles.heroActions}`}
    ></Skeleton>
  );
}

function ProfilePreview() {
  return (
    <div className={styles.profilePreview}>
      {/* Replace src with your actual screenshot */}
      {/* <img
        src="/tree-mobile-screenshot.png"
        alt="Profile Preview"
        className={styles.profileScreenshot}
      /> */}
      <Image
        className={styles.profileScreenshot}
        src={
          "https://res.cloudinary.com/kakashib2k/image/upload/v1756577604/LinksFor/important/homePage/treePreview.png"
        }
        alt="tree-preview"
        fill={true}
      />
    </div>
  );
}

function Features() {
  return (
    <section className={styles.featuresSection}>
      <h2>Everything you need for your link-in-bio</h2>
      <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <span>🎨</span>
          <h3>Custom Themes</h3>
          <p>Personalize your page with beautiful themes and layouts.</p>
        </div>
        {/* <div className={styles.featureCard}>
          <span>📊</span>
          <h3>Analytics</h3>
          <p>See which links get the most clicks and where your visitors come from.</p>
        </div> */}
        <div className={styles.featureCard}>
          <span>⚡</span>
          <h3>Fast & Mobile-first</h3>
          <p>Optimized for all devices, instant loading, always available.</p>
        </div>
        {/* <div className={styles.featureCard}>
          <span>🔗</span>
          <h3>Unlimited Links</h3>
          <p>Add as many links as you want, reorder them anytime.</p>
        </div> */}
        <div className={styles.featureCard}>
          <span>🔒</span>
          <h3>Privacy First</h3>
          <p>No tracking, no ads, your data stays yours.</p>
        </div>
        <div className={styles.featureCard}>
          <span>💸</span>
          <h3>100% Free</h3>
          <p>No paywalls, no hidden fees. Free forever.</p>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className={styles.testimonialsSection}>
      <h2>Loved by creators</h2>
      <div className={styles.testimonialsGrid}>
        <blockquote className={styles.testimonial}>
          “As a student, I use it to showcase my portfolio, socials, and resume.
          Looks professional and simple!”
          <br />
          <span className={styles.testimonialAuthor}>— Ishan.K</span>
        </blockquote>
        <blockquote className={styles.testimonial}>
          “The best link-in-bio tool I’ve used. Clean, fast, and easy!”
          <br />
          <span className={styles.testimonialAuthor}>— Alex P.</span>
        </blockquote>
        <blockquote className={styles.testimonial}>
          “I switched from Linktree and never looked back.”
          <br />
          <span className={styles.testimonialAuthor}>— Priya S.</span>
        </blockquote>
        <blockquote className={styles.testimonial}>
          “My followers love my new page. Highly recommended!”
          <br />
          <span className={styles.testimonialAuthor}>— Chris W.</span>
        </blockquote>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className={styles.faqSection}>
      <h2>FAQ</h2>
      <div className={styles.faqList}>
        <details className={styles.faqItem}>
          <summary>Is it really free?</summary>
          <p>Yes! All features are free for everyone.</p>
        </details>
        <details className={styles.faqItem}>
          <summary>Can I use my own domain?</summary>
          <p>Custom domains are coming soon!</p>
        </details>
        <details className={styles.faqItem}>
          <summary>How do I customize my page?</summary>
          <p>
            Sign up, go to your admin console, and pick your theme and links.
          </p>
        </details>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        &copy; {new Date().getFullYear()} linksfor. All rights reserved.
      </div>
      <div>
        <Link href="/privacy" className={styles.footerLink}>
          Privacy
        </Link>
        <span> | </span>
        <Link href="/terms" className={styles.footerLink}>
          Terms
        </Link>
      </div>
    </footer>
  );
}

export default async function page() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>All your links. One simple page.</h1>
            <p>
              Share your socials, websites, shops, and more with a single link.
              Beautiful, fast, and totally free.
            </p>
            <Suspense fallback={<HeroActionsSkeleton />}>
              {/* @ts-expect-error Async Server Component */}
              <HeroActions />
            </Suspense>
          </div>
          <ProfilePreview />
        </div>
      </section>

      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
