export function upperFirst(s:string):string{
    if (s != null){
        if(s.includes('-')) {
            return (s.split('-').map((val) => {
                return (upperFirst(val))
            }).join(' '));
        }
        return (s.charAt(0).toUpperCase() + s.slice(1))
    }
    return null
}
