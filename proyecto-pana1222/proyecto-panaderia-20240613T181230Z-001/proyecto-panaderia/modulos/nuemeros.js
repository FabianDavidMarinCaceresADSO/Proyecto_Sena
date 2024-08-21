const is_numbers = (event)=>{
    let numeros = /^[0-9]+$/
    if(!numeros.test(event.key)) event.preventDefault();
}

export default is_numbers;