// components/Mermaid.js
import dynamic from 'next/dynamic';

const MermaidNoSSR = dynamic(() => import('./mermaidInner'), { ssr: false });

export default MermaidNoSSR;
