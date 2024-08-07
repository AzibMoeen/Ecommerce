import React from 'react'
import { Link } from 'react-router-dom'
import {
    Home,
    LineChart,
    Package,
    Package2,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip"


const DashBoardNavbar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
    <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link
            to="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
        </Link>
        <TooltipProvider>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        to="/dashboard"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <Home className="h-5 w-5" />
                        <span className="sr-only">Dashboard</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <TooltipProvider>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        to="/orders"
                        className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="sr-only">Orders</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <TooltipProvider>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        to="/myproducts"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <Package className="h-5 w-5" />
                        <span className="sr-only">Products</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
        </TooltipProvider>
        
            
           
    </nav>
</aside>
  )
}

export default DashBoardNavbar