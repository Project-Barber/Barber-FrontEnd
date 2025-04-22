
export const maskDate = (value: string) => {
    return value
      .replace(/^(\d{2})(\d)/, "$1/$2")
      .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
      .slice(0, 10)
  }
  
  export const maskPhone = (value: string) => {
    return value
    .replace(/\D/g, "") // Remove tudo que não for número
    .replace(/^(\d{2})(\d)/, "($1) $2") // Adiciona DDD com parênteses
    .replace(/(\d)(\d{4})(\d{4})$/, "$1 $2-$3") // Espaço após o 9 e adiciona traço
    .slice(0, 16); // Limita a 16 caracteres
  }
  
