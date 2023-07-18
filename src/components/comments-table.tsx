import Comment from "./comment";

function CommentsTable() {

  const listaComentarios = [
    {
      name : 'maria',
      comentario:  'Que lindo bolso'
    },
    {
      name : 'santaigo',
      comentario:  'Que feo bolso'
    },
    {
      name : 'juan',
      comentario:  'que vale'
    }
  ]




  return (
    <div className="flex flex-col">
      {listaComentarios.map((el)=> <Comment name={el.name} mensaje={el.comentario}/>)}
      
    </div>
  );
}

export default CommentsTable;