import UserContext from '@/contexts/UserContext';
import React, { useContext } from 'react';

export default function useUser() {
	const ctx = useContext(UserContext);
	return ctx;
}
