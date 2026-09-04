'use client';
import { useState } from 'react';
import {
  Container, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Chip, Box, Select, MenuItem, FormControl, InputLabel, Alert,
  Divider, Stack, Avatar
} from '@mui/material';
import { DataGridColDef } from '@mui/x-data-grid';
import { Add, Edit, Lock, Visibility, Search, FilterList, Download } from '@mui/icons-material';
import { DEMO_USERS, USER_GROUPS, ACCESS_ROLES, DEMO_TRANSACTIONS } from '@/lib/demo-data';

const FACULTIES = [
  { id:'amirkabir', name:'امیرکبیر' }, { id:'ataher', name:'اطهر' },
  { id:'saveh', name:'ساوه' }, { id:'khomein', name:'خمین' }, { id:'ashtian', name:'آشتیان' },
];

interface UserForm { uid:string; name:string; family:string; group:string; role:string; faculty:string; phone:string; password:string; }

export default function UsersPage() {
  const [users] = useState(DEMO_USERS);
  const [search, setSearch] = useState('');
  const [filterGroup, setFilterGroup] = useState('all');
  const [filterFaculty, setFilterFaculty] = useState('all');
  const [editUser, setEditUser] = useState<UserForm | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showResetPass, setShowResetPass] = useState<string | null>(null);
  const [newPass, setNewPass] = useState('');
  const [showDetail, setShowDetail] = useState<any>(null);
  const [notif, setNotif] = useState('');

  const filtered = users.filter(u =>
    (u.name.includes(search) || u.family.includes(search) || u.uid.includes(search)) &&
    (filterGroup === 'all' || u.group === filterGroup) &&
    (filterFaculty === 'all' || u.faculty === filterFaculty)
  );

  const columns: GridColDef[] = [
    { field:'uid', headerName:'کد ملی', width:130 },
    { field:'name', headerName:'نام و خانواده', width:150, renderCell: p => `${p.row.name} ${p.row.family}` },
    { field:'group', headerName:'گروه', width:100, renderCell: p => { const g = USER_GROUPS.find(x=>x.id===p.value); return <Chip size="small" label={g?.name||p.value} color={g?.color||'default'} variant="outlined" />; }},
    { field:'role', headerName:'دسترسی', width:120, renderCell: p => { const r = ACCESS_ROLES.find(x=>x.id===p.value); return <Chip size="small" label={r?.name||p.value} color={p.value==='super_admin'?'error':'default'} />; }},
    { field:'faculty', headerName:'دانشکده', width:100, renderCell: p => FACULTIES.find(f=>f.id===p.value)?.name||p.value },
    { field:'balance', headerName:'موجودی', width:130, type:'number', renderCell: p => <span className={p.value<0?'text-red-500':'text-green-600'}>{p.value?.toLocaleString('fa-IR')} تومان</span> },
    { field:'actions', headerName:'عملیات', width:150, sortable:false, renderCell: p => (
      <Stack direction="row" spacing={0.5}>
        <IconButton size="small" onClick={()=>{setEditUser(p.row);setShowForm(true);}}><Edit fontSize="small"/></IconButton>
        <IconButton size="small" onClick={()=>setShowResetPass(p.row.uid)}><Lock fontSize="small"/></IconButton>
        <IconButton size="small" onClick={()=>setShowDetail(p.row)}><Visibility fontSize="small"/></IconButton>
      </Stack>
    )},
  ];

  const notify = (m:string) => { setNotif(m); setTimeout(()=>setNotif(''),3000); };

  return (
    <Container maxWidth="lg" sx={{ py:3 }}>
      <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",mb:3}}>
        <Typography variant="h5" sx={{fontWeight:700}}>مدیریت کاربران ({filtered.length})</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<Download/>}>خروجی اکسل</Button>
          <Button variant="contained" startIcon={<Add/>} onClick={()=>{setEditUser({uid:'',name:'',family:'',group:'student',role:'viewer',faculty:'amirkabir',phone:'',password:''});setShowForm(true);}}>کاربر جدید</Button>
        </Stack>
      </Box>

      <Box sx={{ p:2, mb:3, bgcolor:'white', borderRadius:3, boxShadow:'0 1px 3px rgba(0,0,0,0.05)' }}>
        <Stack direction="row" flexWrap="wrap" gap={2} alignItems="center">
          <Box sx={{flex:"1 1 200px",minWidth:200}}>
            <TextField fullWidth size="small" placeholder="جستجو بر اساس نام، خانواده یا کد ملی..." value={search} onChange={e=>setSearch(e.target.value)} slotProps={{input:{startAdornment:<Search sx={{mr:1,color:'grey.400'}} fontSize="small"/>}}}/>
          </Box>
          <Box sx={{flex:"1 1 200px",minWidth:200}}>
            <FormControl fullWidth size="small"><InputLabel>گروه کاربری</InputLabel>
              <Select value={filterGroup} label="گروه کاربری" onChange={e=>setFilterGroup(e.target.value)}>
                <MenuItem value="all">همه</MenuItem>
                {USER_GROUPS.map(g=><MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{flex:"1 1 200px",minWidth:200}}>
            <FormControl fullWidth size="small"><InputLabel>دانشکده</InputLabel>
              <Select value={filterFaculty} label="دانشکده" onChange={e=>setFilterFaculty(e.target.value)}>
                <MenuItem value="all">همه</MenuItem>
                {FACULTIES.map(f=><MenuItem key={f.id} value={f.id}>{f.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{flex:"1 1 200px",minWidth:200}}>
            <Button fullWidth variant="outlined" startIcon={<FilterList/>}>فیلتر پیشرفته</Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ height:500, bgcolor:'white', borderRadius:3, overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,0.05)' }}>
        <DataGrid rows={filtered} columns={columns} getRowId={r=>r.uid} pageSizeOptions={[5,10,25]} initialState={{pagination:{paginationModel:{pageSize:10}}}} disableRowSelectionOnClick sx={{direction:'rtl'}}/>
      </Box>

      {/* Detail Dialog */}
      {showDetail && (
        <Dialog open onClose={()=>setShowDetail(null)} maxWidth="md" fullWidth>
          <DialogTitle><Box sx={{display:"flex",alignItems:"center",gap:2}}><Avatar sx={{bgcolor:'primary.main'}}>{showDetail.name[0]}</Avatar><div><Typography sx={{fontWeight:700}}>{showDetail.name} {showDetail.family}</Typography><Typography variant="body2" color="text.secondary">{showDetail.uid}</Typography></div></Box></DialogTitle>
          <DialogContent dividers>
            <Stack direction="row" flexWrap="wrap" gap={2}>
              <Box sx={{flex:"1 1 200px",minWidth:200}}><Typography variant="body2" color="text.secondary">گروه کاربری</Typography><Typography sx={{fontWeight:600}}>{USER_GROUPS.find(g=>g.id===showDetail.group)?.name}</Typography></Box>
              <Box sx={{flex:"1 1 200px",minWidth:200}}><Typography variant="body2" color="text.secondary">سطح دسترسی</Typography><Typography sx={{fontWeight:600}}>{ACCESS_ROLES.find(r=>r.id===showDetail.role)?.name}</Typography></Box>
              <Box sx={{flex:"1 1 200px",minWidth:200}}><Typography variant="body2" color="text.secondary">دانشکده</Typography><Typography sx={{fontWeight:600}}>{FACULTIES.find(f=>f.id===showDetail.faculty)?.name}</Typography></Box>
              <Box sx={{flex:"1 1 200px",minWidth:200}}><Typography variant="body2" color="text.secondary">موجودی</Typography><Typography sx={{fontWeight:600}} color={showDetail.balance>=0?'success.main':'error.main'}>{showDetail.balance.toLocaleString('fa-IR')} تومان</Typography></Box>
              <Box sx={{flex:"1 1 200px",minWidth:200}}><Divider/></Box>
              <Box sx={{flex:"1 1 200px",minWidth:200}}><Typography variant="subtitle2" mb={1}>آخرین تراکنش‌ها</Typography>
                {DEMO_TRANSACTIONS.filter(t=>t.uid===showDetail.uid).slice(0,3).map(t=>(
                  <Box sx={{display:"flex",justifyContent:"space-between",py:0.5}}><Typography variant="body2">{t.desc}</Typography><Typography variant="body2" sx={{fontWeight:600}} color={t.type==='UP'?'success.main':'error.main'}>{t.type==='UP'?'+':'-'}{t.amount.toLocaleString('fa-IR')}</Typography></Box>
                ))}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions><Button onClick={()=>setShowDetail(null)}>بستن</Button></DialogActions>
        </Dialog>
      )}

      {/* Edit Dialog */}
      {showForm && editUser && (
        <Dialog open onClose={()=>setShowForm(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editUser.uid?'ویرایش کاربر':'کاربر جدید'}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField label="کد ملی" value={editUser.uid} onChange={e=>setEditUser({...editUser,uid:e.target.value})} fullWidth size="small" disabled={!!users.find(u=>u.uid===editUser.uid)}/>
              <Stack direction="row" flexWrap="wrap" gap={2}><Box sx={{flex:"1 1 200px",minWidth:200}}><TextField label="نام" value={editUser.name} onChange={e=>setEditUser({...editUser,name:e.target.value})} fullWidth size="small"/></Box><Box sx={{flex:"1 1 200px",minWidth:200}}><TextField label="خانواده" value={editUser.family} onChange={e=>setEditUser({...editUser,family:e.target.value})} fullWidth size="small"/></Box></Box>
              <Stack direction="row" flexWrap="wrap" gap={2}>
                <Box sx={{flex:"1 1 200px",minWidth:200}}><FormControl fullWidth size="small"><InputLabel>گروه</InputLabel><Select value={editUser.group} label="گروه" onChange={e=>setEditUser({...editUser,group:e.target.value})}>{USER_GROUPS.map(g=><MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>)}</Select></FormControl></Box>
                <Box sx={{flex:"1 1 200px",minWidth:200}}><FormControl fullWidth size="small"><InputLabel>دسترسی</InputLabel><Select value={editUser.role} label="دسترسی" onChange={e=>setEditUser({...editUser,role:e.target.value})}>{ACCESS_ROLES.map(r=><MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)}</Select></FormControl></Box>
              </Box>
              <FormControl fullWidth size="small"><InputLabel>دانشکده</InputLabel><Select value={editUser.faculty} label="دانشکده" onChange={e=>setEditUser({...editUser,faculty:e.target.value})}>{FACULTIES.map(f=><MenuItem key={f.id} value={f.id}>{f.name}</MenuItem>)}</Select></FormControl>
              <TextField label="تلفن" value={editUser.phone} onChange={e=>setEditUser({...editUser,phone:e.target.value})} fullWidth size="small"/>
              {!users.find(u=>u.uid===editUser.uid) && <TextField label="رمز عبور" type="password" value={editUser.password} onChange={e=>setEditUser({...editUser,password:e.target.value})} fullWidth size="small"/>}
            </Stack>
          </DialogContent>
          <DialogActions><Button onClick={()=>setShowForm(false)}>انصراف</Button><Button variant="contained" onClick={()=>{setShowForm(false);notify('ذخیره شد');}}>ذخیره</Button></DialogActions>
        </Dialog>
      )}

      {/* Reset Password Dialog */}
      {showResetPass && (
        <Dialog open onClose={()=>setShowResetPass(null)} maxWidth="xs" fullWidth>
          <DialogTitle>ریست رمز — {showResetPass}</DialogTitle>
          <DialogContent><TextField fullWidth size="small" label="رمز جدید" type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} sx={{mt:1}}/></DialogContent>
          <DialogActions><Button onClick={()=>setShowResetPass(null)}>انصراف</Button><Button variant="contained" color="warning" onClick={()=>{setShowResetPass(null);setNewPass('');notify('رمز ریست شد');}}>ریست</Button></DialogActions>
        </Dialog>
      )}

      {notif && <Alert severity="success" sx={{position:'fixed',bottom:80,left:'50%',transform:'translateX(-50%)',zIndex:9999}} onClose={()=>setNotif('')}>{notif}</Alert>}
    </Container>
  );
}
