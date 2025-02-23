import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function HtmlConvertorMdx({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <ReactMarkdown rehypePlugins={[rehypeRaw]} className={`prose max-w-none ${className}`}>
            {children as string}
        </ReactMarkdown>
    );
}