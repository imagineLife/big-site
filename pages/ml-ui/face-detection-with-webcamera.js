import dynamic from 'next/dynamic';
import Seo from '../../components/Seo';

const FaceDetectionClient = dynamic(
  () => import('../../components/ml/FaceDetectionClient'),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      <Seo
        title="Webcam Face Detection Demo | Eric Laursen"
        metaDescription="A browser-only webcam face detection demo kept available for direct visitors."
        slug="/ml-ui/face-detection-with-webcamera"
        robots="noindex,follow"
        jsonLdType="WebPage"
      />
      <FaceDetectionClient />
    </>
  );
}
