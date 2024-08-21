const is_letters = (event)=>{
    let letras = /^[a-zA-Zÿ\s]+$/
    if(!letras.test(event.key)) event.preventDefault();
}

export default is_letters;