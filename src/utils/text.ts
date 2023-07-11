export default function replaceWithUppercase(e){
  let value = e.target.value
  value = value.toUpperCase()
  e.target.value = value
}