import React from 'react';

interface SubtitlePreviexProps {
  number: number;
  title: string;
}

const SubtitlePreviex = ({ number, title }: SubtitlePreviexProps) => {
  return <h4 className="text-lg font-semibold">{title}</h4>;
};

export default SubtitlePreviex;
