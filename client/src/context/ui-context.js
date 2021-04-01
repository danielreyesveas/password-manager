import { createContext, useContext, useState } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [showRegister, setShowRegister] = useState(false);
	const [showAddGroup, setShowAddGroup] = useState(false);
	const [showEditGroup, setShowEditGroup] = useState(false);
	const [showDeleteGroup, setShowDeleteGroup] = useState(false);
	const [showAddPassword, setShowAddPassword] = useState(false);
	const [showEditPassword, setShowEditPassword] = useState(false);
	const [showDeletePassword, setShowDeletePassword] = useState(false);
	const [showGenerator, setShowGenerator] = useState(false);

	const values = {
		darkMode,
		setDarkMode,

		showSidebar,
		setShowSidebar,

		showProfileMenu,
		setShowProfileMenu,

		showRegister,
		setShowRegister,

		showAddGroup,
		setShowAddGroup,
		showEditGroup,
		setShowEditGroup,
		showDeleteGroup,
		setShowDeleteGroup,

		showAddPassword,
		setShowAddPassword,
		showEditPassword,
		setShowEditPassword,
		showDeletePassword,
		setShowDeletePassword,

		showGenerator,
		setShowGenerator,
	};

	return <UIContext.Provider value={values}>{children}</UIContext.Provider>;
};

export const useUI = () => useContext(UIContext);
