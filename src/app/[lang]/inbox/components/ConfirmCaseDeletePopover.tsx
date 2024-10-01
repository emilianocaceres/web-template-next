'use client';

import type { TDictionary } from '@/lang/getDictionary';

import type { TRequestStatus } from '@/types/types/TRequest';

import { Trash2Icon } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { CaseDTO } from '@/types/DTOS/case.dto';


interface Props {
    c: CaseDTO;
    dictionary: TDictionary;
}

export function ConfirmCaseDeletePopover({ dictionary, c }: Props) {
    const [reqStatus, setReqStatus] = useState<TRequestStatus>('IDLE');

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
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
                    <Trash2Icon color={'red'} size={16} />
                </Button>
            </PopoverTrigger>

            <PopoverContent className={'w-80'}>
                <div className={'flex flex-col gap-y-4'}>
                    <div className={'grid'}>
                        <h4 className={'font-medium leading-none'}>
                            {c.fullName} - {c.caseNumber}
                        </h4>
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
