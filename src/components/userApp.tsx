'use client'
import { useState } from "react";
import {
  Home,
  LineChart,
  LineChartIcon,
  Menu,
  Settings2,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Preference from "@/pages/preference"; 
import SubscribedChannels from "@/pages/subscribedChannels";
import Stats from "@/pages/Stats";

export default function UserApp() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Preferences":
        return <Preference />;
      case "SubscribedChannels":
        return <SubscribedChannels/>;
      case "Stats":
        return <Stats/>
      default:
        return <Preference/>
    }
  };

  const getNavButtonClass = (component: string) => {
    return `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
      activeComponent === component ? 'text-primary bg-muted' : 'hover:text-primary'
    }`;
  };

  const getNavArrow = (component: string) => {
    return activeComponent === component ? <span className="ml-2">→</span> : null;
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] pt-2">
      <div className="hidden border-r border-red-300 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6"></div>
            <div className="flex-1  ">
              <nav className="grid items-start shadow-slate-100 px-2 text-sm font-medium lg:px-4 fixed">
                <button
                  onClick={() => setActiveComponent("Preferences")}
                  className={getNavButtonClass("Preferences")}
                >
                  <Settings2 className="h-4 w-4" />
                  Preferences {getNavArrow("Preferences")}
                </button>

                <button
                  onClick={() => setActiveComponent("SubscribedChannels")}
                  className={getNavButtonClass("SubscribedChannels")}
                >
                  <Youtube className="h-4 w-4" />
                  Subscribed channels {getNavArrow("SubscribedChannels")}
                </button>

                <button
                  onClick={() => setActiveComponent("Stats")}
                  className={getNavButtonClass("Stats")}
                >
                  <LineChartIcon className="h-4 w-4" />
                  Stats {getNavArrow("Stats")}
                </button>
              </nav>
            </div>
        </div>
      </div>
      <div className="flex flex-col min-h-screen">
        <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-black">
              <nav className="grid gap-2 text-lg font-medium">
                <button
                  onClick={() => setActiveComponent("Preferences")}
                  className={getNavButtonClass("Preferences")}
                >
                  <Home className="h-5 w-5" />
                  Preferences {getNavArrow("Preferences")}
                </button>
                <button
                  onClick={() => setActiveComponent("Subscribed channels")}
                  className={getNavButtonClass("Subscribed channels")}
                >
                  <LineChart className="h-5 w-5" />
                  Subscribed channels {getNavArrow("Subscribed channels")}
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <div className="flex-1 p-4">{renderComponent()}</div>
      </div>
    </div>
  );
}
