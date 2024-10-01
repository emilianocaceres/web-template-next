import { SelectValue } from '@radix-ui/react-select';
import { Edit2Icon, PlusCircleIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDictionary } from '@/lang/getDictionary';

export default async function Page() {
    const dictionary = await getDictionary();

    const tabs = Object.entries(dictionary.pages.cases.tabs as Record<string, string>) as [
        keyof typeof dictionary.pages.cases.tabs,
        string,
    ][];

    return (
        <div>
            <Tabs className={'flex-col gap-4'} defaultValue={tabs[0][0]}>
                <div className={'flex gap-4 mb-10'}>
                    {tabs.map(([key, label]) => (
                        <TabsList key={key} className={'min-w-60'}>
                            <TabsTrigger className={'w-full'} value={key}>
                                {label}
                            </TabsTrigger>
                        </TabsList>
                    ))}
                </div>

                {tabs.map(([key]) => (
                    <TabsContent key={key} value={key}>
                        {key === 'identification' && (
                            <div className={'flex-col space-y-8'}>
                                <h4 className={'text-xl'}>Datos Personales</h4>

                                <div className={'flex basis-1/3 gap-4'}>
                                    {[
                                        ['name', 'Nombre'],
                                        ['lastName', 'Apellido'],
                                        ['fiscalNumber', 'CUIT'],
                                        ['clientNumber', 'Cliente número'],
                                    ].map(([key, label]) => (
                                        <Input
                                            key={key}
                                            className={'basis-1/3'}
                                            placeholder={label}
                                        />
                                    ))}
                                </div>

                                <div className={'flex basis-1/3 gap-4'}>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder={'Riesgo'} />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {Object.entries(dictionary.enums.caseRisk).map(
                                                ([key, label]) => (
                                                    <SelectItem key={key} value={key}>
                                                        {label}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>

                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder={'Sucursal'} />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {[1, 2, 3, 4].map((i) => (
                                                <SelectItem key={i} value={i.toString()}>
                                                    {i}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder={'Oficial'} />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {[
                                                [1, 'Juan Carlos'],
                                                [2, 'Pedro'],
                                                [3, 'Luis'],
                                            ].map(([key, label]) => (
                                                <SelectItem key={key} value={key.toString()}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className={'flex-col space-y-4'}>
                                    {[
                                        ['previsional', 'Es cliente previsional'],
                                        ['pep', 'PEP'],
                                        ['obligatedSubject', 'Sujeto Obligado'],
                                        ['sectorial', 'Opera con Sector Público'],
                                        ['meli', 'Cliente Meli'],
                                    ].map(([key, label]) => (
                                        <div key={key} className={'flex items-center'}>
                                            <Switch id={key} />
                                            <Label className={'ml-2'} htmlFor={key}>
                                                {label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>

                                <div className={'flex gap-2 items-center'}>
                                    <h4 className={'text-xl'}>Perfiles</h4>

                                    <Button variant={'ghost'}>
                                        <PlusCircleIcon size={20} />
                                    </Button>
                                </div>

                                <div className={'flex gap-4'}>
                                    {[
                                        ['profileDocumental', 'Perfil Documental'],
                                        ['status', 'Estado'],
                                        ['assignedBy', 'Asignado Por'],
                                        ['incomeSupport', 'Sustento de Ingresos'],
                                        ['accounts', 'Cuentas'],
                                    ].map(([key, label]) => (
                                        <Input key={key} placeholder={label} />
                                    ))}

                                    <div className={'flex'}>
                                        <Button variant={'ghost'}>
                                            <Edit2Icon size={18} />
                                        </Button>

                                        <Button variant={'ghost'}>
                                            <Trash2Icon color={'red'} size={18} />
                                        </Button>
                                    </div>
                                </div>

                                <div className={'w-full flex justify-center'}>
                                    <Button variant={'outline'}>
                                        <PlusCircleIcon className={'mr-4'} size={20} />
                                        Añadir Otro
                                    </Button>
                                </div>
                            </div>
                        )}

                        {key === 'information' && <h1>inputs de información</h1>}

                        {key === 'precedents' && <h1>inputs de precedentes</h1>}

                        {key === 'transactions' && <h1>inputs de transacciones</h1>}

                        {key === 'close' && <h1>inputs de cierre</h1>}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
