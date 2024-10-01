

import { getDictionary } from '@/lang/getDictionary';


import { CaseDTO } from '@/types/DTOS/case.dto';
import InboxPage from './page.client';


export default async function Page() {
    const dictionary = await getDictionary();

    const cases: CaseDTO[] = Array.from({ length: 100 }, (_, index) => ({
        caseNumber: index + 1,
        validationDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)), // Random date in the past
        fiscalNumber: `FISC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        fullName: `Name ${index + 1}`,
        analysisDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)), // Random date in the past
        risk: ['HIGH', 'MEDIUM', 'LOW'][Math.floor(Math.random() * 3)] as CaseDTO['risk'],
    }));

    return <InboxPage cases={cases} dictionary={dictionary} />;
}
