export function validateRegisterData(email, password, username, age, gender) {
  if (!email || !password || !username || !age || !gender) {
    throw new Error("Todos los campos son obligatorios");
  }

  if (password.length < 6) {
    throw new Error("La contraseña debe tener mínimo 6 caracteres");
  }

  if (username.length < 3) {
    throw new Error("El nombre de usuario debe tener al menos 3 caracteres");
  }

  const numericAge = parseInt(age);

  if (isNaN(numericAge) || numericAge < 13 || numericAge > 100) {
    throw new Error("Edad inválida (13-100)");
  }

  if (!Array.isArray(gender) || gender.length === 0) {
    throw new Error("Debe seleccionar un género");
  }
}

export function validateLoginData(email, password) {
  if (!email || !password) {
    throw new Error("Email y contraseña son obligatorios");
  }

  if (password.length < 6) {
    throw new Error("Contraseña inválida");
  }
}
