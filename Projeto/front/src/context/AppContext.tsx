import {
  createContext,
  FunctionComponent,
  ReactElement,
  useState,
} from "react";
interface IProps {
  children: ReactElement;
}
export interface IAppContext {
  username: string;
  password: string;
  //passa a funcao de salvar usuario
  saveUser: (username: string, password: string) => void;
}

/*exportação para utilização nas telas em que as informações
do contexto serão necessárias*/
export const AppContext = createContext({} as IAppContext);

export const AppProvider: FunctionComponent<IProps> = ({ children }) => {

  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
  });

  function saveUser(username: string, password: string) {
    setUsuario({
        username: username,
        password: password
    })
  }

  //inciialmente os dados sao vazios
  return (
    <AppContext.Provider
      value={
        {
          username: usuario.username,
          password: usuario.password,
          saveUser : saveUser
        } as IAppContext
      }
    >
      {children}
    </AppContext.Provider>
  );
};
