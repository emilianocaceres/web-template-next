import type { TDictionary } from '@/lang/getDictionary';

import { Input } from '@/components/ui/input';

export function Search({ dictionary }: { dictionary: TDictionary }) {
    return (
        <div>
            <Input
                className={'md:w-[100px] lg:w-[300px]'}
                placeholder={`${dictionary.misc.verbs.search}...`}
                type={'search'}
            />
        </div>
    );
}
