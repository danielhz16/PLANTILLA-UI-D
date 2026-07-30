// Barrel file for all common components
// NOTE: `export * from './folder'` will only re-export **named** exports
// (it does _not_ forward a module's default export). We use explicit
// `export { default as Name } from '...'` entries so that consuming code
// can import defaults from the barrel as well. If you convert every
// component to a named export only, then a simple `export *` approach
// would work, but in this codebase we like having both styles available.


// loading
export { default as Loader } from './loading/Loader';
export { default as Lazy } from './loading/Lazy';
export { Preview } from './loading/Preview';

// buttons
export { MainButton } from './buttons/MainButton';

// filter
export { default as MainFilter } from './filter/MainFilter';
export { ErrorBoundary } from './error-boundary';
export * from './filter/inputs/filter-status';

// cards & containers
export { MainCard } from './Cards/MainCard';
export { Espace } from './containers/Espace';

// forms
export { MainForm } from './form/MainForm';
export { InputGenerator } from './form/InputGenerator';

// crud helpers
export { List } from './crud/list/List';
export { useList } from './crud/list/useList';
export { Details } from './crud/details/Details';
export { useDetails } from './crud/details/useDetails';

// modals
export { ModalForm } from './modal/ModalForm';
export { Modal, ConfirmDialog } from './modal';

// pagination (alReady has its own barrel)
export * from './pagination';

// layout components
export { Sidebar } from './layout/Sidebar';
export { Header } from './layout/Header';
export { ThemeToggle } from './layout/ThemeToggle';
export { Title } from './layout/Title/Title';
export { default as MainLayout } from './layout/MainLayout';

// table utilities
export { MainTable } from './tables/mainTable/MainTable';
export { NoData } from './tables/mainTable/NoData';
export * from './tables/cell';

// charts
export * from './charts';

// view-details
export { DetailsView } from './view-details/DetailsView';
export { ViewDetailsModal } from './view-details/ViewDetailsModal';

export * from './helpers';
