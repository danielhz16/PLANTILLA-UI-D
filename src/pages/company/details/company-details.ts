import type { DetailField } from '@/shared/types/details';
import { Building2, Hash } from 'lucide-react';

export const companyDetailFields: DetailField[] = [
    { label: 'Nombre', name: 'name', icon: Building2 },
    { label: 'NIT', name: 'nit', icon: Hash },
];
