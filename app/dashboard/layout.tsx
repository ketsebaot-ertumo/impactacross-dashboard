import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex overflow-hidden">
      <div className="min-h-full overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header />
        <main className="flex-1 p-6 bg-muted/50 min-h-[60mvh] overflow-y-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}



// // /app/dashboard/layout.tsx
// import { FC } from 'react';
// import Sidebar from '@/components/layout/Sidebar';
// import Header from '@/components/layout/Header';
// import Footer from '@/components/layout/Footer';

// const DashboardLayout: FC = ({ children }) => {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="flex-1 p-6">{children}</main>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
