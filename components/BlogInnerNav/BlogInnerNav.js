import Link from 'next/link';
import './BlogNav.scss';
const BlogInnerNav = () => (
  <div className="topnav" id="myTopnav">
    <Link href="#home" className="active">
      Home
    </Link>
    <Link href="#news">News</Link>
    <Link href="#contact">Contact</Link>
    <Link href="#about">About</Link>
    <Link href="javascript:void(0);" className="icon" onclick="myFunction()">
      <i className="fa fa-bars"></i>
    </Link>
  </div>
);

export default BlogInnerNav;
