import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { menuConfig } from '../../../routes/menu/menu.config';
import './Sidebar.css';
import { INFO_SISTEM } from '../../../conf/info.sistem';

interface SidebarProps {
  
}

export const Sidebar: React.FC<SidebarProps> = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                {!isCollapsed && <span className="logo-text">
                    {INFO_SISTEM.fulllogo ? (
                        <img
                            src={INFO_SISTEM.fulllogo}
                            alt={INFO_SISTEM.name}
                            style={{ height: 32, objectFit: 'contain' }}
                        />
                    ) : (
                        INFO_SISTEM.name
                    )}
                </span>}
                {isCollapsed && (
                    <span className="logo-text">
                        {INFO_SISTEM.minlogo ? (
                            <img
                                src={INFO_SISTEM.minlogo}
                                alt={INFO_SISTEM.name}
                                style={{ height: 28, objectFit: 'contain' }}
                            />
                        ) : (
                            INFO_SISTEM.name?.charAt(0) ?? 'V'
                        )}
                    </span>
                )}
                <button className="collapse-btn" onClick={toggleSidebar}>
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            <nav className="sidebar-nav">
                {menuConfig.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={index}
                            to={item.path}
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
