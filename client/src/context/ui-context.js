import { createContext, useContext, useState } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
	const [showEditPassword, setShowEditPassword] = useState(false);

	return (
		<UIContext.Provider value={{ showEditPassword, setShowEditPassword }}>
			{children}
		</UIContext.Provider>
	);
};

export const useShowEditPassword = () => useContext(UIContext);
