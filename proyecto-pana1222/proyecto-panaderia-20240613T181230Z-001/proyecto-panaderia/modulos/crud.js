import {URL,URL_usuarios} from "../confing/confing.js";




// ENVIAR DATOS 
export const Enviar = async (data, dirrecion) => {
    try {
        const response = await fetch(`${URL}${dirrecion}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
               'Content-type': 'application/json; charset=UTF-8',
        }
    });

    // Convertir la respuesta en JSON
    const result = await response.json();

    // Verificar si la solicitud fue exitosa
    if (response.ok) {
        console.log("Datos enviados correctamente:", result);
    } else {
        console.error("Error al enviar los datos:", result);
    }
} catch (error) {
    console.error("Error en la solicitud:", error);
}
};


//

export const login = async (data) => {
    const response = await fetch(`${URL}usuarios?correo=${data.correo}&password=${data.password}`);
    const usuarios = await response.json();

    // Si el array no está vacío, el usuario existe
    if (usuarios.length > 0) {
        return usuarios[0];  // Retorna los datos del usuario
    } else {
        return null;  // No se encontró el usuario
    }
};


export const listar = async (dirrecion) => {
        const response = await fetch(`${URL}${dirrecion}`);
        const data = await response.json();
        return data;
};

export const eliminar = async (id, dirrecion) => {
    try {
        const response = await fetch(`${URL}${dirrecion}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            console.log("Elemento eliminado correctamente.");
        } else {
            console.error("Error al eliminar el elemento.");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }

};

export const modificar = async (id, datos, dirrecion) => {
    try {
        const response = await fetch(`${URL}${dirrecion}/${id}`, {
            method: 'PUT', // Usualmente 'PUT' para actualizar
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });

        // Convertir la respuesta en JSON
        const result = await response.json();

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            console.log("Elemento modificado correctamente:", result);
        } else {
            console.error("Error al modificar el elemento:", result);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
};

export const buscar = async(id, enpoint)=>{
    const data = await fetch(`${URL}${enpoint}/${id}`);
    const repus = await data.json();
    return repus;
}

export const patch = async (id, datos, dirrecion) => {
    try {
        const response = await fetch(`${URL}${dirrecion}/${id}`, {
            method: 'PATCH', // Usualmente 'PATCH' para actualizar
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });

        // Convertir la respuesta en JSON
        const result = await response.json();

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            console.log("Elemento modificado correctamente:", result);
        } else {
            console.error("Error al modificar el elemento:", result);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
};