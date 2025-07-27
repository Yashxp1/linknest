import { Blocks, Link, Paintbrush, Share2 } from 'lucide-react';
import React from 'react';

const IconList = [
  {
    icon: <Share2 size={40} className="stroke-[1.2]" />,
    title: 'Easy Sharing',
    description: 'Share your profile with one simple link',
  },
  {
    icon: <Link size={40} className="stroke-[1.2]" />,
    title: 'URL Shortener',
    description: 'Create short, memorable links instantly',
  },
  {
    icon: <Paintbrush size={40} className="stroke-[1.2]" />,
    title: 'Clean Design',
    description: 'Minimal and elegant interface',
  },
  {
    icon: <Blocks size={40} className="stroke-[1.2]" />,
    title: 'All Unified',
    description: 'Organize everything in one place',
  },
];

const Icons = () => {
  return (
    <div className="w-full py-12">
      {/* Main title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Everything you need to{' '}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            share your world
          </span>
        </h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Create your personalized link hub with powerful features designed for
          creators, professionals, and everyone in between.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 max-w-5xl mx-auto">
        {IconList.map((item, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 
                       border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-gray-300 
                       dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:border-white/20">
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20">
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-xl 
                              dark:from-blue-400/30 dark:to-purple-600/30"
              />
            </div>

            {/* Content */}
            <div className="relative flex flex-col items-center text-center space-y-3">
              {/* Icon container */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-30" />
                <div
                  className="relative rounded-full border p-3 transition-all duration-300 group-hover:scale-110
                                border-gray-300 bg-gray-100 group-hover:border-blue-300 group-hover:bg-blue-50
                                dark:border-white/20 dark:bg-white/10 dark:group-hover:border-white/30 dark:group-hover:bg-white/20"
                >
                  <div
                    className="transition-all duration-300 text-gray-700 group-hover:text-blue-600 
                                  dark:text-white dark:group-hover:text-blue-200"
                  >
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="space-y-1">
                <h3
                  className="font-semibold text-base transition-colors duration-300
                               text-gray-900 group-hover:text-blue-600
                               dark:text-white dark:group-hover:text-blue-200"
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed transition-colors duration-300
                              text-gray-600 group-hover:text-gray-800
                              dark:text-white/70 dark:group-hover:text-white/90"
                >
                  {item.description}
                </p>
              </div>
            </div>

            {/* Bottom border glow */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100
                            bg-gradient-to-r from-transparent via-blue-400/50 to-transparent
                            dark:via-blue-400/60"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Icons;
