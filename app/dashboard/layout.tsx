// import Footer from "@/components/layout/Footer";
// import Header from "@/components/layout/Header";
// import Sidebar from "@/components/layout/Sidebar";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex overflow-hidden">
//       <div className="min-h-full overflow-y-auto">
//         <Sidebar />
//       </div>
//       <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
//         <Header />
//         <main className="flex-1 p-6 bg-muted/50 min-h-[60mvh] overflow-y-auto">
//           {children}
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// }



import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Fixed height and non-scrollable */}
      <div className="h-full">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-full">
        <Header />

        {/* Scrollable main content only */}
        <main className="flex-1 overflow-y-auto overflow-x-auto p-6 bg-muted/50">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
