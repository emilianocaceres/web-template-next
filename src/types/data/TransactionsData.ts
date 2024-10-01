import type { TransactionDTO } from '../interfaces/transactions.dto';

export const dataTransactions: TransactionDTO[] = [
    {
        id: 12345678,
        user: {
            id: 1,
            name: 'Juan',
            lastname: 'Pérez',
            fiscalNumber: '20234567890',
            email: 'juan.perez@example.com',
            phone: '1122334455',
            netVolumen: 3500000,
            maxQuota: 5000000,
            status: 'active',
        },
        date: '2023-09-01T10:30:00.000Z',
        amount: 150000,
        currency: 'USD',
        customer: {
            id: 1,
            name: 'TechCorp',
        },
    },
    {
        id: 87654321,
        user: {
            id: 2,
            name: 'María',
            lastname: 'Gómez',
            fiscalNumber: '20345678901',
            email: 'maria.gomez@example.com',
            phone: '1198765432',
            netVolumen: 2500000,
            maxQuota: 4500000,
            status: 'inactive',
        },
        date: '2023-08-25T15:45:00.000Z',
        amount: 100000,
        currency: 'EUR',
        customer: {
            id: 2,
            name: 'FinanceInc',
        },
    },
    {
        id: 11223344,
        user: {
            id: 3,
            name: 'Luis',
            lastname: 'Rodríguez',
            fiscalNumber: '20456789012',
            email: 'luis.rodriguez@example.com',
            phone: '1165432109',
            netVolumen: 3000000,
            maxQuota: 5500000,
            status: 'pending',
        },
        date: '2023-09-03T08:20:00.000Z',
        amount: 200000,
        currency: 'GBP',
        customer: {
            id: 3,
            name: 'GlobalTrade',
        },
    },
];
