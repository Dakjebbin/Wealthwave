//import PropTypes from 'prop-types';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main>
        <SidebarTrigger className='bg-slate-600' />
        {children}
      </main>
    </SidebarProvider>
  );
}

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,  
// };