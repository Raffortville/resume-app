import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface CustomProps {
	isAllowed: boolean;
	children?: React.ReactNode;
	redirectPath?: string;
}

export const PrivateRoute: React.FC<CustomProps> = ({
	isAllowed,
	children,
	redirectPath,
}) => {
	if (!isAllowed) {
		return <Navigate to={redirectPath ?? '/'} replace />;
	}

	return <>{children}</> ?? <Outlet />;
};
