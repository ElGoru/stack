import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { ModeToggle } from '../components/mode-toggle'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '../components/ui/menubar'

export const Route = createRootRoute({
  component: () => (
    <div className="">
      <div className="p-2 flex gap-2">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Menu</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link to="/">Home</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="/about">About</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <ModeToggle />
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  )
})
