import { createContext, useContext, useState } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
	const [showAddGroup, setShowAddGroup] = useState(false);
	const [showEditGroup, setShowEditGroup] = useState(false);
	const [showAddPassword, setShowAddPassword] = useState(false);
	const [showEditPassword, setShowEditPassword] = useState(false);
	const [showGenerator, setShowGenerator] = useState(false);

	const values = {
		showAddGroup,
		setShowAddGroup,
		showEditGroup,
		setShowEditGroup,
		showAddPassword,
		setShowAddPassword,
		showEditPassword,
		setShowEditPassword,
		showGenerator,
		setShowGenerator,
	};

	return <UIContext.Provider value={values}>{children}</UIContext.Provider>;
};

export const useUI = () => useContext(UIContext);
