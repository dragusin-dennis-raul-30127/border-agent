import {
  ChartArea,
  ClipboardList,
  ClipboardPlus,
  LayoutDashboardIcon,
  LogOut,
  MapPinPlus,
  ShieldUser,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { clearUserSession, getUserDecodedToken } from "@/lib/user-token";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

const userItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Enter control",
    url: "/control/new",
    icon: ClipboardPlus,
  },
  {
    title: "Control List",
    url: "/control",
    icon: ClipboardList,
  },
  {
    title: "Statistics",
    url: "/stats",
    icon: ChartArea,
  },
];

const adminItems = [
  {
    title: "Borders",
    url: "/borders",
    icon: MapPinPlus,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
];

const Layout = (props: any) => {
  const decoded = getUserDecodedToken();
  const nav = useNavigate();
  let isAdmin = false;

  if (decoded !== null) {
    isAdmin = decoded.isAdmin;
  }

  function logout() {
    clearUserSession();
    nav("/");
  }

  return (
    <>
      <Toaster />
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="">
            <div className="inline-flex items-center gap-2 mt-6">
              <ShieldUser />
              <strong className="text-xl font-bold">Border Agent</strong>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {userItems.map((item) => (
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
            {isAdmin && (
              <SidebarGroup>
                <SidebarGroupLabel>Administrative</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {adminItems.map((item) => (
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
            )}

            <SidebarGroup>
              <Button variant="outline" className="flex gap-2" onClick={logout}>
                <LogOut /> Logout
              </Button>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
        <main className="w-full p-10">
          {/* <SidebarTrigger /> */}
          <div>
            <h2 className="font-bold text-2xl mb-6 mt-0">{props.title}</h2>
            <div>{props.children}</div>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default Layout;
