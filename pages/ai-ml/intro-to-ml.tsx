import Link from "next/link";
import GenericPost from "../../components/GenericPost";
import getAiPaths from "../../hooks/useAiPaths";
export default function PyForDS(){
  const rootPath = '/ai-ml/intro-to-ml'
  const introToMlPaths = getAiPaths('intro-to-ml')
  
  return <GenericPost {...{
    title: 'Introduction To Machine Learning',
    name: 'Introduction To Machine Learning',
    slug: '/ai-ml/intro-to-ml',
    metaDescription:
      'Introductory machine learning notebooks covering supervised learning, loan default prediction, and Boston housing price prediction.',
    tags: [
      'python',
      'data science',
      'machine learning'
    ],
    slugArr: ['ai-ml','intro-to-ml']
  }}>
    <>
    <p>A handful of jupyter notebooks exploring some python & ML topics. numpy, matplotlib, sklearn, pylab, scipy, pandas, statsmodels...</p>
    {introToMlPaths.map(o => <><Link href={`${rootPath}/${o.path}`} key={`${rootPath}/${o.path}`}><h3>{o.title}</h3></Link><p>{o?.description}</p></>)}
    </>
  </GenericPost>
}
