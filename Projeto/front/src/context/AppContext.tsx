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
  id: number;
  //passa a funcao de salvar usuario
  saveUser: (username: string, password: string, id: number) => void;
}

/*exportação para utilização nas telas em que as informações
do contexto serão necessárias*/
export const AppContext = createContext({} as IAppContext);

export const AppProvider: FunctionComponent<IProps> = ({ children }) => {

  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
    id: 0
  });

  function saveUser(username: string, password: string, id: number) {
    setUsuario({
        username: username,
        password: password,
        id: id
    })
  }

  //inciialmente os dados sao vazios
  return (
    <AppContext.Provider
      value={
        {
          username: usuario.username,
          password: usuario.password,
          id: usuario.id,
          saveUser : saveUser
        } as IAppContext
      }
    >
      {children}
    </AppContext.Provider>
  );
};
