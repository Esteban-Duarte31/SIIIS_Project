const FormErrors = ({ error }) => {
    return (
        <>
            {error && <p>{error.message}</p>}
        </>
    );
}
export default FormErrors;