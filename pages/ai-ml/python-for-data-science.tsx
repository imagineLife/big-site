import Link from "next/link";
import GenericPost from "../../components/GenericPost";
import getAiPaths from "../../hooks/useAiPaths";
export default function PyForDS(){
  const rootPath = '/ai-ml/python-for-data-science'
  const apiPaths = getAiPaths('python-for-data-science')
  
  return <GenericPost {...{
    title: 'Learn Python for DataScience',
    name: 'Learn Python for DataScience',
    slug: '/ai-ml/python-for-data-science',
    tags: [
      'python',
      'data science'
    ],
    slugArr: ['ai-ml','python-for-data-science']
  }}>
    <>
    <p>A handful of jupyter notebooks exploring some python & ML topics. numpy, matplotlib, sklearn, pylab, scipy, pandas, statsmodels...</p>
    <h2>Exploratory Data Analysis Examples</h2>
    <p>...coming soon...</p>
    <h2>Specific Data-Analysis Features</h2>
      {apiPaths.map(o => <Link href={`${rootPath}/${o.path}`} key={`${rootPath}/${o.path}`}><h3>{o.title}</h3></Link>)}
    </>
  </GenericPost>
}