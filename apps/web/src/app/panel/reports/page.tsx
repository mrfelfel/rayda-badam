'use client';
import { useState } from 'react';
import {
  Container, Typography, Button, TextField, Paper, FormControl, InputLabel, Select, MenuItem,
  Tabs, Tab, Box, Chip, Stack, Card, CardContent
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Download, FilterList, Receipt, People, Restaurant, TrendingUp } from '@mui/icons-material';
import { DEMO_TRANSACTIONS, DEMO_RESERVATIONS, DEMO_USERS, USER_GROUPS, DEMO_FOODS, DEMO_PLACES } from '@/lib/demo-data';

const REPORT_TYPES = [
  { id: 'financial', label: 'مالی', icon: <Receipt /> },
  { id: 'reservations', label: 'رزروها', icon: <Restaurant /> },
  { id: 'users', label: 'کاربران', icon: <People /> },
  { id: 'delivery', label: 'تحویل', icon: <TrendingUp /> },
];

export default function ReportsPage() {
  const [reportType, setReportType] = useState('financial');
  const [dateFrom] = useState('۱۴۰۵/۰۶/۰۷');
  const [dateTo] = useState('۱۴۰۵/۰۶/۱۳');
  const [filterGroup, setFilterGroup] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(true);

  const totalIncome = DEMO_TRANSACTIONS.filter(t => t.type === 'UP').reduce((s, t) => s + t.amount, 0);
  const totalExpense = DEMO_TRANSACTIONS.filter(t => t.type === 'DOWN').reduce((s, t) => s + t.amount, 0);

  const txColumns: GridColDef[] = [
    { field: 'date', headerName: 'تاریخ', width: 150 },
    { field: 'uid', headerName: 'کد ملی', width: 130 },
    { field: 'desc', headerName: 'شرح', flex: 1, minWidth: 200 },
    { field: 'amount', headerName: 'مبلغ', width: 120, type: 'number', renderCell: p => <span style={{color: p.row.type === 'UP' ? '#16a34a' : '#ef4444', fontWeight: 600}}>{p.row.type === 'UP' ? '+' : '-'}{p.value.toLocaleString('fa-IR')}</span> },
    { field: 'type', headerName: 'نوع', width: 80, renderCell: p => <Chip size="small" label={p.value === 'UP' ? 'واریز' : 'برداشت'} color={p.value === 'UP' ? 'success' : 'error'} variant="outlined" /> },
    { field: 'issuer', headerName: 'منبع', width: 120 },
  ];

  const resColumns: GridColDef[] = [
    { field: 'uid', headerName: 'کد ملی', width: 130 },
    { field: 'date', headerName: 'تاریخ', width: 120 },
    { field: 'mealId', headerName: 'وعده', width: 80, renderCell: p => p.value === '1' ? 'ناهار' : 'شام' },
    { field: 'foodId', headerName: 'غذا', width: 130, renderCell: p => DEMO_FOODS.find(f => f.id === p.value)?.name || p.value },
    { field: 'placeId', headerName: 'محل', width: 120, renderCell: p => DEMO_PLACES.find(pl => pl.id === p.value)?.name || p.value },
    { field: 'delivered', headerName: 'وضعیت', width: 100, renderCell: p => <Chip size="small" label={p.value ? 'تحویل شده' : 'رزرو شده'} color={p.value ? 'success' : 'warning'} variant="outlined" /> },
  ];

  const userColumns: GridColDef[] = [
    { field: 'uid', headerName: 'کد ملی', width: 130 },
    { field: 'name', headerName: 'نام', width: 120, renderCell: p => `${p.row.name} ${p.row.family}` },
    { field: 'group', headerName: 'گروه', width: 100, renderCell: p => USER_GROUPS.find(g => g.id === p.value)?.name || p.value },
    { field: 'balance', headerName: 'موجودی', width: 130, type: 'number', renderCell: p => <span style={{color: p.value < 0 ? '#ef4444' : '#16a34a'}}>{p.value.toLocaleString('fa-IR')}</span> },
  ];

  const getColumns = () => {
    switch (reportType) {
      case 'financial': return txColumns;
      case 'reservations': return resColumns;
      case 'users': return userColumns;
      default: return txColumns;
    }
  };

  const getData = () => {
    switch (reportType) {
      case 'financial': return DEMO_TRANSACTIONS;
      case 'reservations': return DEMO_RESERVATIONS;
      case 'users': return DEMO_USERS;
      default: return [];
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>گزارشات</Typography>
        <Button variant="outlined" startIcon={<Download />}>خروجی اکسل</Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={reportType} onChange={(_, v) => setReportType(v)} variant="scrollable" scrollButtons="auto">
          {REPORT_TYPES.map(rt => (
            <Tab key={rt.id} value={rt.id} label={rt.label} icon={rt.icon} iconPosition="start" sx={{ minHeight: 48 }} />
          ))}
        </Tabs>
      </Paper>

      <Stack direction="row" sx={{flexWrap:"wrap",mb:3}} >
        <Card sx={{ flex: '1 1 200px' }}><CardContent>
          <Typography variant="body2" color="text.secondary">کل واریزی</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>+{totalIncome.toLocaleString('fa-IR')}</Typography>
        </CardContent></Card>
        <Card sx={{ flex: '1 1 200px' }}><CardContent>
          <Typography variant="body2" color="text.secondary">کل برداشت</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.main' }}>-{totalExpense.toLocaleString('fa-IR')}</Typography>
        </CardContent></Card>
        <Card sx={{ flex: '1 1 200px' }}><CardContent>
          <Typography variant="body2" color="text.secondary">تعداد کاربران</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{DEMO_USERS.length}</Typography>
        </CardContent></Card>
        <Card sx={{ flex: '1 1 200px' }}><CardContent>
          <Typography variant="body2" color="text.secondary">تعداد رزروها</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{DEMO_RESERVATIONS.length}</Typography>
        </CardContent></Card>
      </Stack>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>فیلترها</Typography>
          <Button size="small" onClick={() => setShowFilters(!showFilters)}>{showFilters ? 'بستن' : 'باز کردن'}</Button>
        </Box>
        {showFilters && (
          <Stack direction="row" sx={{flexWrap:"wrap"}} >
            <TextField size="small" label="از تاریخ" defaultValue={dateFrom} sx={{ minWidth: 150 }} />
            <TextField size="small" label="تا تاریخ" defaultValue={dateTo} sx={{ minWidth: 150 }} />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>گروه</InputLabel>
              <Select value={filterGroup} label="گروه" onChange={e => setFilterGroup(e.target.value)}>
                <MenuItem value="all">همه</MenuItem>
                {USER_GROUPS.map(g => <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>وضعیت</InputLabel>
              <Select value={filterStatus} label="وضعیت" onChange={e => setFilterStatus(e.target.value)}>
                <MenuItem value="all">همه</MenuItem>
                <MenuItem value="delivered">تحویل شده</MenuItem>
                <MenuItem value="reserved">رزرو شده</MenuItem>
                <MenuItem value="cancelled">لغو شده</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" size="small">اعمال</Button>
            <Button variant="outlined" size="small">پاک کردن</Button>
            <Button variant="outlined" size="small" startIcon={<FilterList />}>ذخیره قالب</Button>
          </Stack>
        )}
      </Paper>

      <Paper sx={{ height: 450 }}>
        <DataGrid
          rows={getData()}
          columns={getColumns()}
          getRowId={r => r.id || r.uid}
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
          sx={{ direction: 'rtl' }}
        />
      </Paper>
    </Container>
  );
}
