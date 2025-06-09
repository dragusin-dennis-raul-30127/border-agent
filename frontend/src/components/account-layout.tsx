import { LayoutDashboardIcon } from "lucide-react";
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
  SidebarTrigger,
} from "./ui/sidebar";
import { title } from "process";
import { Button } from "./ui/button";
import { clearUserSession, getUserDecodedToken } from "@/lib/user-token";
import { useNavigate } from "react-router-dom";

const userItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Enter control",
    url: "/control/new",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Control List",
    url: "/control",
    icon: LayoutDashboardIcon,
  },
];

const adminItems = [
  {
    title: "Borders",
    url: "/borders",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Users",
    url: "/users",
    icon: LayoutDashboardIcon,
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
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <h1>APlicatie</h1>
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
              <Button variant="outline" onClick={logout}>
                Logout
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
