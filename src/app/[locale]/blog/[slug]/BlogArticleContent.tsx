'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from '@/i18n/navigation';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function generateTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TOCItem[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fff\u3400-\u4dbf-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+$/, '');
    items.push({ id, text, level: match[1].length });
  }
  return items;
}

function TableOfContents({
  items,
  activeId,
  progress,
}: {
  items: TOCItem[];
  activeId: string;
  progress: number;
}) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <div>
        {/* Reading progress bar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-400 tabular-nums w-8 text-right">
            {Math.round(Math.min(progress, 100))}%
          </span>
        </div>

        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          On this page
        </h4>
        <ul className="space-y-0.5 text-sm border-l border-gray-200">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Update URL hash without jump
                    window.history.pushState(null, '', `#${item.id}`);
                  }
                }}
                className={`block py-1.5 leading-snug transition-all duration-200 border-l-2 -ml-px ${
                  item.level === 3 ? 'pl-6 text-[13px]' : 'pl-3'
                } ${
                  activeId === item.id
                    ? 'border-blue-600 text-blue-700 font-medium'
                    : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function getHeadingId(children: React.ReactNode): string {
  const text =
    typeof children === 'string'
      ? children
      : Array.isArray(children)
        ? children.map((c) => (typeof c === 'string' ? c : '')).join('')
        : '';
  return text
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fff\u3400-\u4dbf-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+$/, '');
}

const markdownComponents = {
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={getHeadingId(children)} className="scroll-mt-24" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 id={getHeadingId(children)} className="scroll-mt-24" {...props}>{children}</h3>
  ),
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src={src} alt={alt || ''} className="max-w-md mx-auto rounded-lg" {...props} />
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href && href.startsWith('/')) {
      return <Link href={href as never} {...props}>{children}</Link>;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  },
};

export default function BlogArticleContent({ content }: { content: string }) {
  const tocItems = useMemo(() => generateTOC(content), [content]);
  const [activeId, setActiveId] = useState('');
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  // Scroll-based heading tracking — always highlights the last heading scrolled past
  const handleScroll = useCallback(() => {
    if (tocItems.length === 0) return;

    const scrollY = window.scrollY;
    const headerOffset = 100; // account for sticky header

    // Calculate reading progress based on article element
    if (articleRef.current) {
      const rect = articleRef.current.getBoundingClientRect();
      const articleTop = rect.top + scrollY;
      const articleHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrolled = scrollY - articleTop + windowHeight * 0.3;
      const pct = (scrolled / articleHeight) * 100;
      setProgress(Math.max(0, Math.min(pct, 100)));
    }

    // Find the last heading that has been scrolled past
    let currentId = '';
    for (const item of tocItems) {
      const el = document.getElementById(item.id);
      if (el) {
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY >= top - headerOffset) {
          currentId = item.id;
        } else {
          break;
        }
      }
    }

    if (currentId) {
      setActiveId(currentId);
    }
  }, [tocItems]);

  useEffect(() => {
    if (tocItems.length === 0) return;

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, tocItems]);

  return (
    <div className="flex items-start gap-10">
      <article
        ref={articleRef}
        className="prose prose-gray prose-lg max-w-none flex-1 min-w-0 prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:font-semibold prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-blockquote:border-blue-300 prose-blockquote:text-gray-600 prose-hr:border-gray-200 prose-hr:my-10"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {content}
        </ReactMarkdown>
      </article>
      <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-28">
        <TableOfContents items={tocItems} activeId={activeId} progress={progress} />
      </aside>
    </div>
  );
}