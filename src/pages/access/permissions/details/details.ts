import type { DetailField } from '@/shared/types/details';
import { ShieldCheck, KeyRound, FileText } from 'lucide-react';

export const permissionDetailFields: DetailField[] = [
    { label: 'ID', name: 'id', icon: KeyRound },
    { label: 'Nombre', name: 'name', icon: ShieldCheck },
    { label: 'Descripción', name: 'description', icon: FileText },
];
