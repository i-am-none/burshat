"use client";


//   return (
  //     <div className="sticky top-0 inset-x-0 z-50 group">
  //       <header className="relative h-16 mx-auto duration-200 bg-black border-ui-border-base">
  //         <nav className="content-container txt-xsmall-plus text-white flex items-center justify-between w-full h-full text-small-regular">
  //           <div className="flex-1 basis-0 h-full flex items-center">
  //             <div className="h-full">
  //               <SideMenu regions={regions} />
  //             </div>
  //           </div>
  
  //           <div className="flex items-center h-full">
  //             <LocalizedClientLink
  //               href="/"
  //               className="txt-compact-xlarge-plus hover:text-gray-300 uppercase"
  //               data-testid="nav-store-link"
  //             >
  //               Burshat
  //             </LocalizedClientLink>
  //           </div>
  
  //           <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
  //             <div className="hidden small:flex items-center gap-x-6 h-full">
  //               <LocalizedClientLink
  //                 className="hover:text-gray-300 text-white"
  //                 href="/account"
  {/*   
    /* /* <Suspense
    fallback={
      <LocalizedClientLink
      className="hover:text-gray-300 text-white flex gap-2"
      href="/cart"
      data-testid="nav-cart-link"
      >
      Cart (0)
      </LocalizedClientLink>
      }
      >
      <CartButton />
      </Suspense> */  }
      //                 data-testid="nav-account-link"
      //               >
      //                 Account
      //               </LocalizedClientLink>
      //             </div>
      //           </div>
      //         </nav>
      //       </header>
      //     </div>
      //   )
      // }
      // {
        
      
      
      
      
      
      import { Suspense } from "react"
      
      
      import LocalizedClientLink from "@modules/common/components/localized-client-link"
      import CartButton from "@modules/layout/components/cart-button"
      
      import React, { useState, useEffect } from "react";
      import Link from "next/link";
      import { motion, AnimatePresence } from "framer-motion";
      import { ShoppingBag, User, Menu, X, Search } from "lucide-react";
      import { Button } from "@medusajs/ui";
      import { cn } from "lib/util/cn";
      //  export default async function Nav() 
      
      
      interface NavbarProps {
        transparent?: boolean;
      }
      
      export default function Navbar({ transparent = true }: NavbarProps) {
        const [scrolled, setScrolled] = useState(false);
        const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
        const [cartCount, setCartCount] = useState(0);
      
        useEffect(() => {
          const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
              setScrolled(isScrolled);
            }
          };
      
          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
        }, [scrolled]);
      
        const navLinks = [
          { name: "HOME", path: "/" },
          { name: "SHOP", path: "/shop" },
          { name: "COLLECTIONS", path: "/collections" },
          { name: "ABOUT", path: "/about" },
          { name: "CONTACT", path: "/contact" },
        ];
      
        const navbarClasses = cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
          {
            "bg-black/80 backdrop-blur-md shadow-lg": scrolled,
            "bg-transparent": !scrolled && transparent,
            "bg-black": !transparent || (transparent && mobileMenuOpen),
          }
        );
      
        return (
          <header className={navbarClasses}>
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="small"
                className="md:hidden flex text-white hover:bg-brand-gold/20"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
      
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-3xl font-playfair font-bold text-white letter-spacing-wide">
                  BURSHAT
                </h1>
              </Link>
      
              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="text-sm text-white/80 hover:text-brand-gold transition-colors duration-300 hover-underline uppercase tracking-widest"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
      
              {/* Action Icons */}
              <div className="flex items-center space-x-4">
                <button
                  aria-label="Search"
                  className="text-white/80 hover:text-brand-gold transition-colors duration-300"
                >
                  <Search size={20} />
                </button>
      
                <Link href="/profile">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/80 hover:text-brand-gold transition-colors duration-300"
                    aria-label="Profile"
                  >
                    <User size={20} />
                  </motion.button>
                </Link>
      
                <Suspense
                  fallback={
                    <LocalizedClientLink href="/cart" data-testid="nav-cart-link">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ShoppingBag
                          size={20}
                          className="text-white/80 hover:text-brand-gold transition-colors duration-300"
                        />
                      </motion.div>
                    </LocalizedClientLink>
                  }
                >
                  <CartButton />
                </Suspense>
              </div>
            </div>
      
            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden bg-black border-t border-gray-800"
                >
                  <nav className="container mx-auto py-6 px-4 flex flex-col space-y-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.path}
                        className="text-white/80 hover:text-brand-gold py-2 transition-colors duration-300 uppercase tracking-widest"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </header>
        );
      }
  