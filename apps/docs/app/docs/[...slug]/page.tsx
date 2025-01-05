import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css';

const MarkdownPage = ({ params }: { params: { slug: string[] } }) => {
  const slugPath = params.slug.join('/');
  const filePath = path.join(process.cwd(), 'content', 'docs', `${slugPath}.md`);
  let content = '';

  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return <div className="p-4">Markdown file not found.</div>;
  }

  return (
    <article className="markdown-body prose dark:prose-invert max-w-none w-full p-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default MarkdownPage;
