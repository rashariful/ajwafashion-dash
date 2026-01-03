import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Settings,
  ChevronLeft,
  ChevronDown,
  Flag,
  BriefcaseBusiness,
  Box,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Banner", url: "/banner", icon: Flag },
  { title: "Key Point", url: "/key", icon: BriefcaseBusiness },
  { title: "Product", url: "/product", icon: Box },
  { title: "Order", url: "/order", icon: ShoppingBag },
  { title: "Promotion", url: "/promotion", icon: ShoppingBag },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const [expanded, setExpanded] = useState<string | null>(null);

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClasses = (path: string) => {
    return isActive(path)
      ? "bg-primary/10 text-primary font-medium"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors";
  };

  const toggleExpand = (title: string) => {
    setExpanded(expanded === title ? null : title);
  };

  return (
    <Sidebar className="border-r border-border bg-card shadow-sm">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            {open && (
              <div>
                <h2 className="text-lg font-bold text-foreground">Admin</h2>
                <p className="text-xs text-muted-foreground">
                  Ajwa Fashion Management
                </p>
              </div>
            )}
          </div>
          {open && (
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-accent transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 ">
              {items.map((item) => (
                <div key={item.title}>
                  {/* Parent Item */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="w-full">
                      {item.children ? (
                        <button
                          onClick={() => toggleExpand(item.title)}
                          className={`flex items-center  justify-between px-3 py-2.5 rounded-lg w-full transition-colors ${getNavClasses(
                            item.url
                          )}`}
                        >
                          <div className="flex items-center gap-3 ">
                            <item.icon
                              className={`w-5 h-5 ${
                                isActive(item.url)
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                            {open && (
                              <span className="text-md font-semibold">
                                {item.title}
                              </span>
                            )}
                          </div>
                          {open && (
                            <motion.div
                              animate={{
                                rotate: expanded === item.title ? 0 : -90,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </motion.div>
                          )}
                        </button>
                      ) : (
                        <NavLink
                          to={item.url}
                          end={item.url === "/"}
                          className={`flex items-center gap-3 px-3 py-5 rounded-lg transition-colors ${getNavClasses(
                            item.url
                          )}`}
                        >
                          <item.icon
                            className={`w-5 h-5 ${
                              isActive(item.url)
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                          {open && (
                            <span className="text-md font-semibold">
                              {item.title}
                            </span>
                          )}
                        </NavLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Children Items */}
                  <AnimatePresence>
                    {item.children && expanded === item.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.2 },
                            opacity: { duration: 0.15, delay: 0.05 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.2 },
                            opacity: { duration: 0.1 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="ml-8 pl-2 border-l border-border/50 space-y-1 py-1">
                          {item.children.map((child) => (
                            <NavLink
                              key={child.title}
                              to={child.url}
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${getNavClasses(
                                child.url
                              )}`}
                            >
                              <child.icon
                                className={`w-4 h-4 ${
                                  isActive(child.url)
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                }`}
                              />
                              {open && <span>{child.title}</span>}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
