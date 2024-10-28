import { Bell, Search, Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
export default function DashboardPreview() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            {/* <Image width={60} height={60} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ITTIHAD%20logo-C8wTrhiIf0loXhfUWnuyEu1oLdB6Gx.jpg" alt="ITTIHAD Logo" className="h-10 w-10" /> */}
            <h1 className="text-2xl font-bold">ITTIHAD Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Welcome back, Admin</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input className="pl-9" placeholder="Search..." />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Employees</CardTitle>
              <CardDescription>Current number of employees</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">1,234</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Jobs</CardTitle>
              <CardDescription>Open positions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">56</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Placements</CardTitle>
              <CardDescription>Successful placements this month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">89</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}