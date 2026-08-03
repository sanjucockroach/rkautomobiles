import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { SiteHeader } from "@/components/rk/site-header";
import { Footer } from "@/components/rk/footer";
import { blogPosts } from "@/lib/blog-data";

export function BlogPage() {
  return (
    <div className="public-page min-h-screen">
      <SiteHeader />
      <main>
        <section className="border-b border-slate-200 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <p className="text-sm font-bold text-brand-red">RK ownership journal</p>
              <h1 className="mt-4 text-5xl font-black text-slate-950 sm:text-6xl">Buy wisely. Own happily. Sell clearly.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Straightforward guidance for Indian used-car buyers and owners, written to help you make a better decision rather than a faster one.</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {blogPosts.map((post, index) => (
              <motion.article key={post.slug} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: (index % 3) * 0.08 }} className="group flex min-h-[340px] flex-col border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-slate-900/5">
                <div className="flex items-center justify-between gap-3 text-xs font-bold">
                  <span className="text-brand-blue">{post.category}</span>
                  <span className="flex items-center gap-1 text-slate-500"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                </div>
                <h2 className="mt-8 text-2xl font-black leading-tight text-slate-950">{post.title}</h2>
                <p className="mt-4 leading-7 text-slate-600">{post.description}</p>
                <a href={`/blog/${post.slug}.html`} className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold text-slate-900 group-hover:text-brand-blue">Read the guide <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

