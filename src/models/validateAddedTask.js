const validateAddedTask={
    "title":"Added Task",
    "description":"will validate the added task",
    "type":"object",
    "properties":{
        "task_name": {
            "description": "It should be text or Integer ",
            "type": ["string","integer"],
            "minLength":5
        },
        "points": {
            "description": "Points should be eneterd ",
            "type": "integer",
            "minimum":2,
            "maximum":10
        }
    },
    "required": ["task_name", "points"]
}

export default validateAddedTask;




    
