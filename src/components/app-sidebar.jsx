import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"
import axios from "axios";
import { toast } from "react-toastify";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Course",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Withdrawal",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Contact Us",
    url: "#",
    icon: Search,
  },
  {
    title: "About Us",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const baseUrl = import.meta.env.VITE_BASEURL
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/auth/logout`,
        {
        withCredentials:true
        }
    )

    if (response?.data.success) {
      toast.success(response?.data?.message);
      window.location.assign("/login");
    }
      
    } catch (error) { 
      if (error instanceof axios.AxiosError) {
        console.log('');
      } if(error === 404 || error) {
        const errorMessage =  error.message 
        toast.error(errorMessage)  
      }
    }
    
  }
  return (
    
    <Sidebar collapsible= "icon">
      <SidebarContent className = 'bg-[#FFBBB8]'>
        <SidebarGroup >
          <SidebarGroupLabel className="mb-20">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem  key={item.title}>
                  <SidebarMenuButton  className="mb-10 font-bold text-2xl" asChild>
                    <a href={item.url}>
                      <item.icon className="" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
       {/* <SidebarFooter>
        
      <button onClick={handleLogout} className='bg-red-700 border-solid border-2'>
            Log Out
          </button>
      </SidebarFooter>   */}

    </Sidebar>
  )
}
