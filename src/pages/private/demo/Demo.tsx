import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { MainTable } from '@/ui/tables/mainTable/MainTable';
import { MainCard } from '@/ui/Cards/MainCard';
import { Pagination, usePagination } from '@/ui/pagination';
import { Modal, ConfirmDialog } from '@/ui/modal';
import { MainButton } from '@/ui/buttons/MainButton';
import { Espace } from '@/ui/containers/Espace';
import { Edit, Trash2, Eye, Plus, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DemoUser {
    id: number;
    nombre: string;
    email: string;
    rol: string;
    estado: 'activo' | 'inactivo' | 'pendiente';
    fechaCreacion: string;
}

const generateMockData = (count: number): DemoUser[] => {
    const nombres = ['Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Luis Rodríguez', 'Laura Sánchez', 'Pedro González', 'Sofía Hernández'];
    const roles = ['Administrador', 'Usuario', 'Editor', 'Vista'];
    const estados: DemoUser['estado'][] = ['activo', 'inactivo', 'pendiente'];
    
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        nombre: nombres[i % nombres.length] + ` ${Math.floor(i / nombres.length) + 1}`,
        email: `usuario${i + 1}@example.com`,
        rol: roles[i % roles.length],
        estado: estados[i % estados.length],
        fechaCreacion: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('es-ES'),
    }));
};

const columnHelper = createColumnHelper<DemoUser>();

const Demo: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [confirmType, setConfirmType] = useState<'warning' | 'error' | 'info' | 'success'>('warning');
    const [selectedUser, setSelectedUser] = useState<DemoUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const allData = useMemo(() => generateMockData(150), []);

    const {
        currentPage,
        itemsPerPage,
        totalPages,
        handlePageChange,
        handleItemsPerPageChange,
        paginatedData,
    } = usePagination({
        totalItems: allData.length,
        initialItemsPerPage: 10,
    });

    const displayedData = paginatedData(allData);

    const columns: ColumnDef<DemoUser, any>[] = useMemo(() => [
        columnHelper.accessor('id', {
            header: 'ID',
            cell: (info) => (
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    #{info.getValue()}
                </Typography>
            ),
        }),
        columnHelper.accessor('nombre', {
            header: 'Nombre',
            cell: (info) => (
                <Typography variant="body2" sx={{ color: 'var(--color-text)' }}>
                    {info.getValue()}
                </Typography>
            ),
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: (info) => (
                <Typography variant="body2" sx={{ color: 'var(--color-text)', opacity: 0.8 }}>
                    {info.getValue()}
                </Typography>
            ),
        }),
        columnHelper.accessor('rol', {
            header: 'Rol',
            cell: (info) => (
                <Chip
                    label={info.getValue()}
                    size="small"
                    sx={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                    }}
                />
            ),
        }),
        columnHelper.accessor('estado', {
            header: 'Estado',
            cell: (info) => {
                const estado = info.getValue();
                const statusColors = {
                    activo: { bg: 'var(--color-successSoft)', color: 'var(--color-success)' },
                    inactivo: { bg: 'var(--color-errorSoft)', color: 'var(--color-error)' },
                    pendiente: { bg: 'var(--color-warningSoft)', color: 'var(--color-warning)' },
                };
                const color = statusColors[estado];
                return (
                    <Chip
                        label={estado.charAt(0).toUpperCase() + estado.slice(1)}
                        size="small"
                        sx={{
                            backgroundColor: color.bg,
                            color: color.color,
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            border: `1px solid ${color.color}20`,
                        }}
                    />
                );
            },
        }),
        columnHelper.accessor('fechaCreacion', {
            header: 'Fecha de Creación',
            cell: (info) => (
                <Typography variant="body2" sx={{ color: 'var(--color-text)', opacity: 0.7 }}>
                    {info.getValue()}
                </Typography>
            ),
        }),
        columnHelper.display({
            id: 'acciones',
            header: 'Acciones',
            cell: (info) => {
                const user = info.row.original;
                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            size="small"
                            onClick={() => {
                                setSelectedUser(user);
                                setModalOpen(true);
                            }}
                            sx={{
                                minWidth: 36,
                                height: 36,
                                borderRadius: '8px',
                                backgroundColor: 'var(--color-hover)',
                                color: 'var(--color-text)',
                                '&:hover': {
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                },
                            }}
                        >
                            <Eye size={16} />
                        </Button>
                        <Button
                            size="small"
                            onClick={() => {
                                setSelectedUser(user);
                                setConfirmType('warning');
                                setConfirmDialogOpen(true);
                            }}
                            sx={{
                                minWidth: 36,
                                height: 36,
                                borderRadius: '8px',
                                backgroundColor: 'var(--color-warningSoft)',
                                color: 'var(--color-warning)',
                                '&:hover': {
                                    backgroundColor: 'var(--color-warningSoftHover)',
                                },
                            }}
                        >
                            <Edit size={16} />
                        </Button>
                        <Button
                            size="small"
                            onClick={() => {
                                setSelectedUser(user);
                                setConfirmType('error');
                                setConfirmDialogOpen(true);
                            }}
                            sx={{
                                minWidth: 36,
                                height: 36,
                                borderRadius: '8px',
                                backgroundColor: 'var(--color-errorSoft)',
                                color: 'var(--color-error)',
                                '&:hover': {
                                    backgroundColor: 'var(--color-errorSoftHover)',
                                },
                            }}
                        >
                            <Trash2 size={16} />
                        </Button>
                    </Box>
                );
            },
        }),
    ], []);

    const handleConfirm = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setConfirmDialogOpen(false);
        toast.success(`Operación completada para ${selectedUser?.nombre}`);
        setSelectedUser(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <MainCard>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--color-text)' }}>
                        Página Demo - Componentes
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'var(--color-text)', opacity: 0.7 }}>
                        Esta página demuestra el uso de Paginación, Modales y Diálogos de Confirmación con datos de prueba.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <MainButton
                            variant="contained"
                            onClick={() => {
                                setSelectedUser(null);
                                setModalOpen(true);
                            }}
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                            <Plus size={18} />
                            Abrir Modal
                        </MainButton>
                        <MainButton
                            variant="outlined"
                            onClick={() => {
                                setConfirmType('info');
                                setConfirmDialogOpen(true);
                            }}
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                            <Info size={18} />
                            Diálogo Info
                        </MainButton>
                        <MainButton
                            variant="outlined"
                            onClick={() => {
                                setConfirmType('success');
                                setConfirmDialogOpen(true);
                            }}
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                            <CheckCircle size={18} />
                            Diálogo Success
                        </MainButton>
                    </Box>
                </Box>
            </MainCard>

            <MainCard sx={{ p: 2, borderRadius: '16px' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--color-text)', mb: 2 }}>
                    Tabla con Paginación ({allData.length} registros)
                </Typography>
                <MainTable
                    data={displayedData}
                    columns={columns}
                    isLoading={false}
                />
                <Espace space={2} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={allData.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    showItemsPerPage={true}
                    showInfo={true}
                />
            </MainCard>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={selectedUser ? `Detalles de ${selectedUser.nombre}` : 'Modal de Ejemplo'}
                maxWidth="md"
                actions={
                    <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
                        <Button
                            onClick={() => setModalOpen(false)}
                            variant="outlined"
                            sx={{
                                flex: 1,
                                borderRadius: '16px',
                                textTransform: 'none',
                                py: 1.2,
                                fontWeight: 600,
                            }}
                        >
                            Cerrar
                        </Button>
                        <Button
                            onClick={() => {
                                toast.success('Acción realizada');
                                setModalOpen(false);
                            }}
                            variant="contained"
                            sx={{
                                flex: 1,
                                borderRadius: '16px',
                                textTransform: 'none',
                                py: 1.2,
                                fontWeight: 600,
                            }}
                        >
                            Guardar
                        </Button>
                    </Box>
                }
            >
                {selectedUser ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                            <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5 }}>
                                ID
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                #{selectedUser.id}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5 }}>
                                Nombre
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {selectedUser.nombre}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5 }}>
                                Email
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {selectedUser.email}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5 }}>
                                Rol
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {selectedUser.rol}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5 }}>
                                Estado
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {selectedUser.estado}
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="body1" sx={{ color: 'var(--color-text)' }}>
                        Este es un ejemplo de modal reutilizable. Puedes agregar cualquier contenido aquí.
                        Los modales son perfectos para mostrar formularios, detalles, o cualquier información adicional.
                    </Typography>
                )}
            </Modal>

            <ConfirmDialog
                open={confirmDialogOpen}
                onClose={() => {
                    setConfirmDialogOpen(false);
                    setSelectedUser(null);
                }}
                onConfirm={handleConfirm}
                title={
                    confirmType === 'warning'
                        ? '¿Editar usuario?'
                        : confirmType === 'error'
                        ? '¿Eliminar usuario?'
                        : confirmType === 'info'
                        ? 'Información importante'
                        : 'Operación exitosa'
                }
                message={
                    confirmType === 'warning'
                        ? selectedUser
                            ? `¿Estás seguro de que deseas editar a ${selectedUser.nombre}?`
                            : '¿Estás seguro de realizar esta acción?'
                        : confirmType === 'error'
                        ? selectedUser
                            ? `¿Estás seguro de que deseas eliminar a ${selectedUser.nombre}? Esta acción no se puede deshacer.`
                            : 'Esta acción es irreversible. ¿Deseas continuar?'
                        : confirmType === 'info'
                        ? 'Este es un diálogo de información. Úsalo para mostrar mensajes importantes al usuario.'
                        : 'La operación se completó exitosamente.'
                }
                type={confirmType}
                confirmText={
                    confirmType === 'warning'
                        ? 'Editar'
                        : confirmType === 'error'
                        ? 'Eliminar'
                        : confirmType === 'info'
                        ? 'Entendido'
                        : 'Aceptar'
                }
                cancelText="Cancelar"
                confirmColor={
                    confirmType === 'error'
                        ? 'error'
                        : confirmType === 'success'
                        ? 'success'
                        : 'primary'
                }
                isLoading={isLoading}
            />
        </Box>
    );
};

export default Demo;
