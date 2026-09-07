import React, { useState, useMemo } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { menuConfig, type MenuItem } from '../../routes/menu/menu.config';
import './Sidebar.css';
import { INFO_SYSTEM } from '../../conf/info.system';
import { useThemeContext } from '@/ui/theme/ThemeContext';
import { useAuth } from '@/features/auth';

interface SidebarProps {

}

export const Sidebar: React.FC<SidebarProps> = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});
    const { theme } = useThemeContext();
    const isDark = theme === 'dark';
    const logoFilter = isDark ? 'brightness(0) invert(1)' : undefined;
    const location = useLocation();
    const { validarPermiso } = useAuth();

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    const toggleMenu = (index: number) => {
        setOpenMenus(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const isChildActive = (children: MenuItem[]) => {
        return children.some(child => child.path && location.pathname.startsWith(child.path));
    };

    const hasAccess = (item: MenuItem): boolean => {
        if (!item.permission) return true;
        return validarPermiso(item.permission, item.level ?? 1);
    };

    const visibleMenu = useMemo(() => {
        return menuConfig
            .map(item => {
                if (item.children) {
                    const visibleChildren = item.children.filter(hasAccess);
                    if (visibleChildren.length === 0) return null;
                    return { ...item, children: visibleChildren };
                }
                if (!hasAccess(item)) return null;
                return item;
            })
            .filter(Boolean) as MenuItem[];
    }, [validarPermiso]);

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} style={
            {
                userSelect: 'none'
            }
        }>
            <div className="sidebar-header">
                {!isCollapsed && <span className="logo-text">
                    {INFO_SYSTEM.fulllogo ? (
                        <img
                            src={INFO_SYSTEM.fulllogo}
                            alt={INFO_SYSTEM.name}
                            style={{ height: 48, maxWidth: 160, objectFit: 'contain', filter: logoFilter, transition: 'filter 0.3s ease' }}
                        />
                    ) : (
                        INFO_SYSTEM.name
                    )}
                </span>}
                {isCollapsed && (
                    <span className="logo-text">
                        {INFO_SYSTEM.minlogo ? (
                            <img
                                src={INFO_SYSTEM.minlogo}
                                alt={INFO_SYSTEM.name}
                                style={{ height: 28, objectFit: 'contain', filter: logoFilter, transition: 'filter 0.3s ease' }}
                            />
                        ) : (
                            INFO_SYSTEM.name?.charAt(0) ?? 'V'
                        )}
                    </span>
                )}
                <button className="collapse-btn" onClick={toggleSidebar}>
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            <nav className="sidebar-nav">
                {visibleMenu.map((item, index) => {
                    // Item with children → collapsible group
                    if (item.children && item.children.length > 0) {
                        const isOpen = openMenus[index] ?? false;
                        const hasActiveChild = isChildActive(item.children);

                        return (
                            <div key={index} className="nav-group">
                                <div
                                    className={`nav-item nav-group-header ${hasActiveChild ? 'parent-active' : ''}`}
                                    onClick={() => toggleMenu(index)}
                                    title={isCollapsed ? item.label : ''}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    {!isCollapsed && (
                                        <>
                                            <span className="nav-label">{item.label}</span>
                                            <span className={`nav-group-arrow ${isOpen ? 'open' : ''}`}>
                                                <ChevronDown size={16} />
                                            </span>
                                        </>
                                    )}
                                </div>
                                {!isCollapsed && (
                                    <div className={`nav-group-children ${isOpen ? 'expanded' : ''}`}>
                                        {item.children.map((child, childIndex) => {
                                            const isActive = child.path ? location.pathname.startsWith(child.path) : false;
                                            return (
                                                <Link
                                                    key={childIndex}
                                                    to={child.path ?? '#'}
                                                    className={`nav-item nav-child ${isActive ? 'active' : ''}`}
                                                >
                                                    <span className="nav-icon">{child.icon}</span>
                                                    <span className="nav-label">{child.label}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    // Simple item → normal link
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={index}
                            to={item.path ?? '/'}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                            title={isCollapsed ? item.label : ''}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {!isCollapsed && <span className="nav-label">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};


export default Sidebar;
