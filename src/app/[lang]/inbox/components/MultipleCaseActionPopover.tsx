/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import type { TDictionary } from '@/lang/getDictionary';
import type { CaseDTO } from '@/types/DTOS/case.dto';


import { IconExclamationCircle } from '@tabler/icons-react';
import React, { useState } from 'react';

import { type TRequestStatus } from '@/types/types/TRequest';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface Props {
    cases: CaseDTO[];
    dictionary: TDictionary;
}

export function MultipleCaseActionPopover({ dictionary, cases }: Props) {
    const [reqStatus, setReqStatus] = useState<TRequestStatus>('IDLE');

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const getAlerts = async () => {


        try {
            const response = { data: [] };

            console.log("🚀 ~ getAlerts ~ response:", response)
        } catch (error) {
        }
    };

    const handleSave = async () => {
        if (!inputValue) return;

        setReqStatus('LOADING');

        try {
            // const response = await UserService.patchChangeLimitCustomerUser(idCustomerUser, body);

            setReqStatus('SUCCESS');
        } catch (error) {
            setReqStatus('ERROR');
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={'ghost'}>
                    <IconExclamationCircle size={16} />
                </Button>
            </PopoverTrigger>

            <PopoverContent className={'w-80'}>
                <div className={'flex flex-col gap-y-4'}>
                    <div className={'grid'}>
                        <h4 className={'font-medium leading-none'}>
                            {cases.map((c) => c.fullName).join(', ')}
                        </h4>

                        <pre>{JSON.stringify(cases, null, 4)}</pre>

                        <Separator className={'my-2'} />
                    </div>

                    <div className={'flex items-center gap-x-2'}>
                        <Input
                            className={'w-1/2'}
                            placeholder={'Limite'}
                            type={'number'}
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={'flex items-center justify-between gap-x-1'}>
                        <Button
                            className={'w-full bg-red-500'}
                            size={'default'}
                            variant={'default'}
                        >
                            {dictionary.misc.verbs.close}
                        </Button>

                        <Button
                            className={'w-full'}
                            disabled={reqStatus === 'LOADING'}
                            size={'default'}
                            variant={'default'}
                            onClick={() => void handleSave()}
                        >
                            {dictionary.misc.verbs.save}
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
