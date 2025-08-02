import { Github, Linkedin, Twitter } from 'lucide-react';
import React from 'react';

const Footer = () => {
  const footerItems = [
    {
      title: 'linkdin',
      icon: <Linkedin size={20} className="" />,
      link: 'https://www.linkedin.com/in/yash-raj-3b0a0b285/',
    },
    {
      title: 'X',
      icon: <Github size={20} className="" />,
      link: 'https://www.github.com/yashxp1/linknest',
    },
    {
      title: 'Github',
      icon: <Twitter size={20} className="" />,
      link: 'https://www.x.com/yashxp1',
    },
  ];

  return (
    <div className="flex items-center gap-4 justify-center border px-6 py-2 mb-2 rounded-full bg-gray-100 dark:bg-[#161616]">
      {footerItems.map((i, idx) => (
        <div key={idx} className="hover:text-blue-600 transition-colors">
          <span className="">
            {' '}
            <a href={i.link} target='_blank'>{i.icon}</a>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Footer;
