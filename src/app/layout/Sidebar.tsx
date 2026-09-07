import { useState, useEffect, useCallback, type FC } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';
import type { MenuNode } from '@/lib/routecraft';
import { useMenu } from '@/lib/routecraft';
import './Sidebar.css';
import { INFO_SYSTEM } from '../../conf/info.system';
import { useThemeContext } from '@/components/theme/ThemeContext';

const LOGO_FULL_HEIGHT = 48;
const LOGO_MIN_HEIGHT = 28;
const MAX_LOGO_WIDTH = 160;
const ICON_SIZE = 16;
const LOGO_FALLBACK_CHAR = 'V';

interface LogoInfo {
    readonly src?: string;
    readonly height: number;
    readonly fallback: string;
}

interface NavGroupProps {
    readonly item: MenuNode;
    readonly itemKey: string;
    readonly isCollapsed: boolean;
    readonly isOpen: boolean;
    readonly hasActiveChild: boolean;
    readonly onToggle: (key: string) => void;
    readonly onRequestOpen?: () => void;
    readonly pathname: string;
}

interface NavLinkProps {
    readonly item: MenuNode;
    readonly isCollapsed: boolean;
    readonly onRequestOpen?: () => void;
    readonly pathname: string;
    readonly isChild?: boolean;
}

function SidebarLogo({ logo, alt, filter }: { readonly logo: LogoInfo; readonly alt: string; readonly filter: string | undefined }) {
    if (logo.src) {
        return (
            <img
                src={logo.src}
                alt={alt}
                style={{ height: logo.height, maxWidth: MAX_LOGO_WIDTH, objectFit: 'contain', filter, transition: 'filter 0.3s ease' }}
            />
        );
    }
    return <>{logo.fallback}</>;
}

function cx(...classes: (string | false | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
}

function NavGroup({ item, itemKey, isCollapsed, isOpen, hasActiveChild, onToggle, onRequestOpen, pathname }: NavGroupProps) {
    const handleToggle = useCallback(() => onToggle(itemKey), [itemKey, onToggle]);

    return (
        <div className="nav-group">
            <button
                className={cx('nav-item', 'nav-group-header', hasActiveChild && 'parent-active')}
                onClick={() => {
                    if (isCollapsed) onRequestOpen?.();
                    handleToggle();
                }}
                title={isCollapsed ? item.name : ''}
                aria-expanded={isOpen}
                type="button"
            >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && (
                    <>
                        <span className="nav-label">{item.name}</span>
                        <span className={cx('nav-group-arrow', isOpen && 'open')}>
                            <ChevronDown size={ICON_SIZE} />
                        </span>
                    </>
                )}
            </button>
            {!isCollapsed && item.children && (
                <div className={cx('nav-group-children', isOpen && 'expanded')}>
                    {item.children.map((child) => (
                        <NavLink key={child.path ?? child.name} item={child} isCollapsed={false} pathname={pathname} isChild />
                    ))}
                </div>
            )}
        </div>
    );
}

const NavLink: FC<NavLinkProps> = ({ item, isCollapsed, onRequestOpen, pathname, isChild }) => {
    const isActive = isChild
        ? pathname.startsWith(item.path ?? '')
        : pathname === item.path;

    const linkTo = item.path ?? (isChild ? '#' : '/');

    return (
        <Link
            to={linkTo}
            className={cx('nav-item', isChild && 'nav-child', isActive && 'active')}
            title={isCollapsed ? item.name : ''}
            aria-label={item.name}
            onClick={isCollapsed ? onRequestOpen : undefined}
        >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.name}</span>}
        </Link>
    );
};

export const Sidebar: FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
    const { theme } = useThemeContext();
    const isDark = theme === 'dark';
    const logoFilter = isDark ? 'brightness(0) invert(1)' : undefined;
    const { pathname } = useLocation();
    const { menu } = useMenu();

    const toggleSidebar = useCallback(() => {
        setHovered(false);
        setIsCollapsed((prev) => !prev);
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
                event.preventDefault();
                toggleSidebar();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [toggleSidebar]);

    const toggleMenu = useCallback((key: string) => {
        setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    }, []);

    const requestOpen = useCallback(() => setHovered(true), []);

    const collapsed = isCollapsed && !hovered;

    return (
        <aside
            className={cx('sidebar', collapsed && 'collapsed')}
            style={{ userSelect: 'none' }}
            aria-label="Sidebar navigation"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="sidebar-header">
                {collapsed ? (
                    <span className="logo-text">
                        <SidebarLogo
                            logo={{ src: INFO_SYSTEM.minlogo, height: LOGO_MIN_HEIGHT, fallback: (INFO_SYSTEM.name ?? '').charAt(0) || LOGO_FALLBACK_CHAR }}
                            alt={INFO_SYSTEM.name}
                            filter={logoFilter}
                        />
                    </span>
                ) : (
                    <span className="logo-text">
                        <SidebarLogo
                            logo={{ src: INFO_SYSTEM.fulllogo, height: LOGO_FULL_HEIGHT, fallback: INFO_SYSTEM.name }}
                            alt={INFO_SYSTEM.name}
                            filter={logoFilter}
                        />
                    </span>
                )}
                <button className="collapse-btn" onClick={toggleSidebar} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
                    {collapsed ? <ChevronRight size={ICON_SIZE} /> : <ChevronLeft size={ICON_SIZE} />}
                </button>
            </div>

            <nav className="sidebar-nav" aria-label="Main navigation">
                {menu.map((item) => {
                    const key = item.path ?? item.name;

                    if (item.children && item.children.length > 0) {
                        const hasActiveChild = item.children.some((child) => child.path && pathname.startsWith(child.path));

                        return (
                            <NavGroup
                                key={key}
                                item={item}
                                itemKey={key}
                                isCollapsed={collapsed}
                                isOpen={openMenus[key] ?? false}
                                hasActiveChild={hasActiveChild}
                                onToggle={toggleMenu}
                                onRequestOpen={requestOpen}
                                pathname={pathname}
                            />
                        );
                    }

                    return (
                        <NavLink
                            key={key}
                            item={item}
                            isCollapsed={collapsed}
                            onRequestOpen={requestOpen}
                            pathname={pathname}
                        />
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;