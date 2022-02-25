package co.com.sofka.crud.exception;


/**
        * TodoBusinessException envuelve todas
        * las excepciones de Java estándar no verificadas y las
        * enriquece con un código de error personalizado.
        */
public class TodoBusinessException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public TodoBusinessException(String msg) {
        super(msg);
    }

    public TodoBusinessException(String msg, Exception e) {
        super(msg + " because of " + e.toString());
    }
}
