export default function AlertMessage(){
    function handleClick(event: MouseEvent){
        console.log(event)
    }
    return (
        <div id="alert" className="w-[50vw] h-[50vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-700 hidden">
            <input type="button" value="Aqui" onClick={(e) => handleClick(e)} />

        </div>
    )
}