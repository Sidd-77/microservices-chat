import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import 'github-markdown-css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const MarkdownViewer = () => {
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const markdownPath = `${location.pathname}.md`;
        const response = await fetch(markdownPath);
        if (!response.ok) {
          throw new Error(`Failed to load markdown content: ${response.statusText}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while loading the content');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkdownContent();
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 w-full">
        <Alert variant="destructive" className="w-full">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <article className="w-full h-full">
      <div className="markdown-body prose dark:prose-invert max-w-none w-full p-4 md:p-6 lg:p-8">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          rehypePlugins={[rehypeRaw]}
          className="w-full"
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default MarkdownViewer;