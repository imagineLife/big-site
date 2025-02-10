import Image from 'next/image';

function FolioCard({ title, description, img, aLink, techList }) {
  return (
    // bg-white
    <div className="rounded-lg shadow-md overflow-hidden  border border-gray-600">
      <Image
        src={`/${img}`}
        alt="Project Image"
        // className="object-cover"
        className="w-full h-64 object-cover max-h-[250px]"
        width={'100%'}
        height={'100%'}
        layout="responsive"
        // objectFit="contain"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        {/* className="text-gray-700" */}
        <p>{description}</p>
        {/* text-blue-600  */}
        {techList &&
          techList.map((tl, idx) => (
            <span key={`title-tech-${tl}`}>
              {idx !== techList.length - 1
                ? `${tl.toUpperCase()} | `
                : tl.toUpperCase()}
            </span>
          ))}
        <a href={aLink} className="block hover:underline mt-4">
          Check it out! 🚀
        </a>
      </div>
    </div>
  );
}

export default FolioCard;
