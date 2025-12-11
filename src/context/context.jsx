import { createContext, useState, useContext } from "react";

// O contexto é usado para gerenciar o estado de autenticação do usuário em toda a aplicação React.
const AppContext = createContext();

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(() => {

        try {
            const usuarioStorage = localStorage.getItem('usuario_logado');
            return usuarioStorage ? JSON.parse(usuarioStorage) : null

        } catch (error) {
            console.error('Erro ao carregar usuário do localStorage:', error);
            return null;
        }
    });

    // Função de login:
    const login = (dadosUsuario) => {
        localStorage.setItem('usuario_logado', JSON.stringify(dadosUsuario));
        setUsuario(dadosUsuario);
    }

    // Função de logout:
    const logout = () => {
        localStorage.removeItem('usuario_logado');
        setUsuario(null);
    };

    return (
        <AppContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AppContext.Provider>
    );
}

export function UseAuth() {
    return useContext(AppContext);
}