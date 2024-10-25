export function appendPath(path: string|undefined, id: string){
    return (path?`${path}.${id}`:id)
}