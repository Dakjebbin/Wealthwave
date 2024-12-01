//import PropTypes from 'prop-types';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className='bg-slate-300 w-full'>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,  
// };