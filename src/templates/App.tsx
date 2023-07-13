import Header from "../components/header";


function App({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default App;
