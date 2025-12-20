import dynamic from 'next/dynamic';

const FaceDetectionClient = dynamic(
  () => import('../../components/ml/FaceDetectionClient'),
  { ssr: false }
);

export default function Page() {
  return <FaceDetectionClient />;
}
