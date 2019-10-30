const validateAddedTask={
    "title":"Added Task",
    "description":"will validate the added task",
    "type":"object",
    "properties":{
        "task_name": {
            "description": "It should be text or Integer ",
            "type": ["string","integer"]
            
        },
        "points": {
            "description": "Points should be eneterd ",
            "type":["integer","string"],
            "minimum":2,
            "maximum":10
        }
    },
    "required": ["task_name", "points"]
}

export default validateAddedTask;




    
