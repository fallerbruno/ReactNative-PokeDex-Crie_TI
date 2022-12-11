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
  age: number;
  sex: string;

  //passa a funcao de salvar usuario
  saveUser: (username: string, password: string, id: number, age: number, sex: string) => void;
}

/*exportação para utilização nas telas em que as informações
do contexto serão necessárias*/
export const AppContext = createContext({} as IAppContext);

export const AppProvider: FunctionComponent<IProps> = ({ children }) => {

  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
    id: 0,
    sex: "",
    age: 0,
  });

  function saveUser(username: string, password: string, id: number, age: number, sex: string) {
    setUsuario({
        username: username,
        password: password,
        id: id,
        age: age,
        sex: sex,
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
          age: usuario.age,
          sex: usuario.sex,
          saveUser : saveUser
        } as IAppContext
      }
    >
      
      {children}
    </AppContext.Provider>
  );
};
