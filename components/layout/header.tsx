"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Home, Building2, Building, Search, Menu, X, Phone, MapPin, DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

import Image from "next/image";
import LogoBlackYellow from "@/app/assets/images/LogoBlackYellow.png";


type NavItem = {
  id: string;
  title: string;
  href: string;
  icon?: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    id: 'home',
    title: "Inicio",
    href: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    id: 'buy',
    title: "Comprar",
    href: "/properties?transactionType=buy",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    id: 'rent',
    title: "Alquilar",
    href: "/properties?transactionType=rent",
    icon: <Building className="h-4 w-4" />,
  },
  {
    id: 'project',
    title: "Proyectos",
    href: "/properties?transactionType=project",
    icon: <Building className="h-4 w-4" />,
  },
  {
    id: 'about',
    title: "Nosotros",
    href: "/aboutus",
  }
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('home');
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled || pathname !== "/" 
        ? "bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b"
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex max-h-40 items-center justify-between md:justify-start">
          <div className="flex p-4 items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={LogoBlackYellow}
                alt="B&B Real Estate Logo"
                style={{ objectFit: "contain" }}
                className="w-25 md:w-30"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 md:ml-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  "text text-base transition-colors hover:text-primary flex items-center gap-1",
                  activeItem === item.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="grid gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    "flex items-center gap-2 text-base font-bold transition-colors hover:text-primary py-2",
                    activeItem === item.id ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}