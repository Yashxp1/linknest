import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Toolbar from '@/components/Toolbar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='hidden lg:flex'>
        <Sidebar />
      </div>
      {children}
      <div className='flex lg:hidden'>
        <Toolbar />
      </div>
    </div>
  );
}
