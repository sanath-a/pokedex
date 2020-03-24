export function upperFirst(s:string):string{
    if (s != null){
        return (s.charAt(0).toUpperCase() + s.slice(1))
    }
    return null
}