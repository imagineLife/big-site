import React from 'react';
import Image from 'next/image';
export default function CertItem({
  title,
  subText,
  textContext,
  // aLink,
  techList,
  img,
}) {
  return (
    <div className="border rounded p-6 w-full text-white border-gray-600 flex justify-between">
      <div className="flex-grow-0 flex-shrink-0 m-0">
        <Image
          src={`/${img}`}
          alt={`${title}-image`}
          width={100}
          height={100}
        />
      </div>
      <section className="flex flex-col">
        <h3 className="text-white text-right text-2xl font-normal m-0 mb-2">
          {title}
        </h3>
        {textContext && (
          <sup className="text-white text-right mt-2 mb-2">
            <i>{textContext}</i>
          </sup>
        )}
        <p className="text-sm text-right mt-2 max-w-[80%] ml-auto mb-0">
          {subText}
          <br />
        </p>
      </section>
    </div>
  );
}
