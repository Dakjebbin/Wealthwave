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
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
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
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>


        
     
      <button onClick={handleLogout} className='bg-red-700 border-solid border-2'>
            Log Out
          </button>
      </SidebarFooter>
    </Sidebar>
  )
}
