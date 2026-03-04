import React, { JSX } from 'react';
import {
  Home,
  Users,
  ShoppingCart,
  Droplet,
  TrendingUp,
  User,
} from 'lucide-react';
import Button from '../common/PrimaryButton';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Trang chủ', icon: <Home className="w-5 h-5" />, active: true },
  { label: 'Thành viên', icon: <Users className="w-5 h-5" /> },
  { label: 'Mua chứng', icon: <ShoppingCart className="w-5 h-5" /> },
  { label: 'Tờ nước', icon: <Droplet className="w-5 h-5" /> },
  { label: 'Bán cấp', icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'Cá nhân', icon: <User className="w-5 h-5" /> },
];

export default function Sidebar(): JSX.Element {
  return (
    <aside className="h-screen w-64 border-r border-border bg-background">
      <div className="p-6 border-b border-border">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mb-4">
          <span className="text-primary-foreground font-bold text-lg">H</span>
        </div>
        <h1 className="text-lg font-bold">HTX Nông nghiệp</h1>
        <p className="text-xs text-muted-foreground mt-1">Quản lý hợp tác xã</p>
      </div>

      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </Button>
        ))}
      </nav>
    </aside>
  );
}
