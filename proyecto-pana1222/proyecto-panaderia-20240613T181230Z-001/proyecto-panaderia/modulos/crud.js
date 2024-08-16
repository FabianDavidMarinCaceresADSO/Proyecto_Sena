     


// ENVIAR DATOS 
export const Enviar = async (data) => {
    try {
        const response = await fetch('http://localhost:3000/usuarios', {
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