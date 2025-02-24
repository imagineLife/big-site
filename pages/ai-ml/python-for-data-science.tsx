import Link from "next/link";
import GenericPost from "../../components/GenericPost";
import getAiPaths from "../../hooks/useAiPaths";
export default function PyForDS(){
  const rootPath = '/ai-ml/python-for-data-science'
  const pfdsPaths = getAiPaths('python-for-data-science')
  const edaPaths = getAiPaths('eda')
  
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
    <p>A handful of jupyter notebooks exploring some python & ML topics. numpy, matplotlib, sklearn, pylab, scipy, pandas, statsmodels, tensorflow...</p>
    <h2>An Intro To Tensorflow</h2>
      <Link href={"/ai-ml/python-for-data-science/tensorflow-and-tensors"}><h3>Tensorflow & Tensors</h3></Link>
      <Link href={"/ai-ml/python-for-data-science/tensorflow-matrixes"}><h3>Tensorflow & Matrixes</h3></Link>
    <h2>Exploratory Data Analysis Examples</h2>
    {edaPaths.map(o => <Link href={`${rootPath}/${o.path}`} key={`${rootPath}/${o.path}`}><h3>{o.title}</h3></Link>)}
    <h2>Specific Data-Analysis Features</h2>
      {pfdsPaths.map(o => <Link href={`${rootPath}/${o.path}`} key={`${rootPath}/${o.path}`}><h3>{o.title}</h3></Link>)}
    </>
  </GenericPost>
}