import { CreditCard, LayoutDashboard, User, Users } from 'lucide-react';

export const routes = [
    { name: 'Overview', path: '/overview', icon: LayoutDashboard },
    { name: 'Alertas', path: '/alerts', icon: CreditCard },
    { name: 'Customer', path: '/customer', icon: Users },
    { name: 'Usuarios', path: '/users', icon: User },
];
