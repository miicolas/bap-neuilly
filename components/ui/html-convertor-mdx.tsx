import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function HtmlConvertorMdx({ children }: { children: string }) {
    return (
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{children}</ReactMarkdown>
    );
}