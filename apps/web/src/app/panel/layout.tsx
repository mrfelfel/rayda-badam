'use client';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import { Restaurant, People, BarChart, Settings, DeliveryDining, ArrowForward, PieChart, AccountBalance } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DRAWER_WIDTH = 240;

const MENU = [
  { href: '/panel/food-manage', label: 'برنامه‌ریزی غذا', icon: <Restaurant /> },
  { href: '/panel/users', label: 'مدیریت کاربران', icon: <People /> },
  { href: '/deliver', label: 'تحویل غذا', icon: <DeliveryDining /> },
  { href: '/financial', label: 'مدیریت مالی', icon: <AccountBalance /> },
  { href: '/panel/reports', label: 'گزارشات', icon: <BarChart /> },
  { href: '/panel/charts', label: 'آمار', icon: <PieChart /> },
];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer variant="permanent" sx={{ width: DRAWER_WIDTH, '& .MuiDrawer-paper': { width: DRAWER_WIDTH, direction: 'rtl', borderLeft: '1px solid #f0f0f0' } }}>
        <Toolbar><Typography variant="h6" fontWeight={700} color="primary">پنل مدیریت</Typography></Toolbar>
        <List>
          {MENU.map(item => (
            <ListItem key={item.href} component={Link} href={item.href} selected={pathname === item.href} sx={{ borderRadius: 2, mx: 1, mb: 0.5, '&.Mui-selected': { bgcolor: 'primary.50', color: 'primary.main' } }}>
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: pathname === item.href ? 700 : 400 }} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f9fafb' }}>
        {children}
      </Box>
    </Box>
  );
}
