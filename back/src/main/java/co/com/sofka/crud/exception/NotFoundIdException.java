package co.com.sofka.crud.exception;

/**
 * NotFoundIdException envuelve todas
 * las excepciones de Java estándar no verificadas y las
 * enriquece con un código de error personalizado.
 */
public class NotFoundIdException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public NotFoundIdException(String msg) {
        super(msg);
    }

    public NotFoundIdException(String msg, Exception e) {
        super(msg + " because of " + e.toString());
    }
}
