import { useContext, useEffect, useState } from "react"
import Form from "../components/Form"
import List from "../components/List"
import Store from "../Store"
import ConexionList from "./ConexionList"
import EventsList from "./EventsList"

export default () =>{
    const { state: { list, todo}, dispatch } = useContext(Store)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        ConexionList.findAll().then((response) =>{
            if(response.ok){
                response.json().then((list) => {
                    dispatch(EventsList.finded(list))
                    console.log("Successful list")
                })
            }
            setLoaded(true)
        })
    }, [dispatch])

    const onDelete = (listId) => {
        ConexionList.delete(listId).then((response) => {
            if(response.ok){
                dispatch(EventsList.deleted(listId))
            }
        })
    }

    return <>
        {!loaded && <div>Loading...</div>}
        {list.elements.length === 0 && <div>Empty list</div>}
        {list.elements.map((element) => {
            return <div key={element.id} id={"list-to-do"+element.id}>
                <fieldset>
                    <legend>
                        {element.name.toUpperCase()}
                        <button className="btn btn-danger me-2" onClick={() => onDelete(element.id)}>Eliminar</button>
                    </legend>
                    <Form listId={element.id} todo={todo} />
                    <List listId={element.id} todo={todo} />
                </fieldset>

            </div>
        })}
    
    </>
}