import type { DetailField } from '@/shared/types/details';
import { Shield, Key, FileText } from 'lucide-react';

export const roleDetailFields: DetailField[] = [
    { label: 'ID', name: 'id', icon: Key },
    { label: 'Nombre', name: 'name', icon: Shield },
    { label: 'Descripción', name: 'description', icon: FileText },
];
