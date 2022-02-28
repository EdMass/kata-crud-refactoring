export const actionType = {
    LIST_CREATED: "list.LIST_CREATED",
    LIST_FINDED: "list.LIST_FINDED",
    LIST_DELETED: "list.LIST_DELETED",
    TODO_FINDED: "list.TODO_FINDED",
    TODO_DELETED: "list.TODO_DELETED",
    TODO_CREATED: "list.TODO_CREATED",
    TODO_ON_EDITED: "list.TODO_ON_EDITED",
    TODO_UPDATED: "list.TODO_CREATED"
};

export default {
    saved : (item) => ({type: actionType.LIST_CREATED, item}),
    finded : (list) => ({type: actionType.LIST_FINDED, list}),
    deleted : (listId) => ({type: actionType.LIST_DELETED, listId}),
    savedItem : (listId, item) => ({type: actionType.TODO_CREATED, item, listId}), 
    findedItem : (listId, items) => ({type: actionType.TODO_FINDED, items, listId}), 
    deletedItem : (listId, itemId) => ({type: actionType.TODO_DELETED, itemId, listId}), 
    onEditedItem : (listId, item) => ({type: actionType.TODO_ON_EDITED, item, listId}), 
    updatedItem : (listId, item) => ({type: actionType.TODO_UPDATED, item, listId})
};