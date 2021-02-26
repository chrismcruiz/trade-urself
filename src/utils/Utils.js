// Funciones frecuentemente utilizadas en diferentes componentes
 
export const filtrarUser = (obj, id) => {
    const user_obj = obj.filter((u) => u._id === id)
    return user_obj
}

export const recorrerObjeto = (obj) => {
    let user = ''
    for (let i = 0; i < obj.length; i++) {
        user = obj[i]
    }
    return user
}