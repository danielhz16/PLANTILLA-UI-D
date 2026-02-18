import React from 'react';

export interface Route {
    path: string;
    element: React.ReactNode;
}

export interface Routes {
    path: string;
    element?: React.ReactNode;
    children: Route[];
}
