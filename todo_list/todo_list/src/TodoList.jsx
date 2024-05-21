import {Button, Card, CardActions, CardContent, IconButton, TextField, Typography} from "@mui/material";

import React, {useState} from "react";
import deleteIcon from './assets/delete.svg';
import todoData from './todo.json';

const dayName = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

function DeleteIcon() {
    return <img src={deleteIcon} alt="delete"/>
}

function TodoList() {

    const todo = todoData;

    function createListOfTodo() {
        return Object.keys(todoData).map(
            (key) => [
                <div key={key}>
                    <Card className="card" sx={{minWidth: 275}}>
                        <CardContent>
                            <Typography className="todo-title" sx={{fontSize: 14, fontWeight: "bold", color: "#73243C"}}
                                        color="text.secondary" gutterBottom>
                                {todo[key].title}
                            </Typography>
                            <Typography className="todo-date" variant="h5" component="div"
                                        sx={{mb: 1.5, color: "#243473", fontWeight: "bolder",}}>
                                {`${dayName[new Date(todo[key].date).getDay()]}, ${new Date(todo[key].date).getDate()} ${months[new Date(todo[key].date).getMonth()]} ${new Date(todo[key].date).getFullYear()}`}
                            </Typography>
                            <Typography className="todo-text" variant="body2">
                                {todo[key].text}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton id={key} onClick={(e) => handeDeleteTodo(e)} aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                        </CardActions>
                    </Card>
                </div>
            ]);
    }

    const [todoItemList, setTodoItemList] = useState(createListOfTodo());

    function handleAddTodo() {
        const newTodo = {
            date: `${document.getElementById("todo-date").value}T${document.getElementById("todo-time").value}`,
            title: document.getElementById("todo-title").value,
            text: document.getElementById("todo-text").value
        }
        let maxTodoId = 0;
        if (Object.keys(todoData).length !== 0) maxTodoId = Object.entries(todoData).reduce((acc, curr) => acc[1] > curr[1] ? acc : curr)[0];
        const newId = maxTodoId + 1;
        todoData[`${newId}`] = newTodo;
        setTodoItemList(createListOfTodo());

        document.querySelectorAll(".todo-add *").forEach((item) => {
            if (!item.classList.contains("convert-btn")) item.value = "";
        })
    }

    function handeDeleteTodo(e) {
        console.log(e.target.closest("button").getAttribute("id"))
        delete todoData[e.target.closest("button").getAttribute("id")]
        setTodoItemList(createListOfTodo());
        console.log(todoData)
    }

    return(
        <>
            <div className="todo">
                <div className="center todo-add">
                    <div className="todo-date">
                        <TextField
                            type="date"
                            hiddenLabel
                            id="todo-date"
                            variant="filled"
                            size="small"
                            sx={{marginRight: "20px"}}
                        />
                        <TextField
                            type="time"
                            hiddenLabel
                            id="todo-time"
                            variant="filled"
                            size="small"
                        />
                    </div>
                    <TextField
                        className="Mui-active"
                        id="todo-title"
                        label="Your todo TITLE should be here..."
                        margin="normal"
                        multiline
                        fullWidth
                        maxRows={4}
                        sx={{width: "50%"}}
                    />
                    <TextField
                        className="Mui-active"
                        id="todo-text"
                        label="Your todo TEXT should be here..."
                        margin="normal"
                        multiline
                        fullWidth
                        maxRows={4}
                        sx={{width: "50%"}}
                    />
                    <br/>
                    <Button onClick={() => handleAddTodo()} className="convert-btn" variant="contained">Add</Button>
                </div>
                <div className="center todo-block">
                    {todoItemList}
                </div>
            </div>
        </>
    )
}

export default TodoList;