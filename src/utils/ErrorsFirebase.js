// errrors firebase 
export const ErrorsFirebase = (codeError) => {
    switch (codeError) {
        case 'auth/email-already-in-use':
            return 'El correo ya esta en uso';
        case 'auth/invalid-email':
            return 'El correo no es valido';
        case 'auth/operation-not-allowed':
            return 'No se puede realizar la operacion';
        case 'auth/weak-password':
            return 'La contraseña es muy debil';
        case 'auth/wrong-password':
            return 'La contraseña es incorrecta';
        case 'auth/user-not-found':
            return 'El usuario no existe';
        case 'auth/user-disabled':
            return 'El usuario esta deshabilitado';
        case 'auth/user-token-expired':
            return 'El token de usuario ha expirado';
        case 'auth/requires-recent-login':
            return 'La sesion de usuario no es valida';
        case 'auth/too-many-requests':
            return 'Demasiadas peticiones';
        case 'auth/invalid-phone-number':
            return 'El numero de telefono no es valido';
        case 'auth/missing-phone-number':
            return 'Falta el numero de telefono';
        default:
            return 'Error desconocido en el servidor';

    }

}