import React, { useState } from "react";
import {axiosWithAuth} from "./axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, props }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    console.log(colorToEdit);
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`,colorToEdit)
    .then(response => {
      axiosWithAuth().get(`http://localhost:5000/api/colors`)
      .then(response => {
        updateColors(response.data);
        setEditing(false)
      })
    })
    .catch(error => {
      console.log(error);
    });
  };

  const AddColor = e => {
    e.preventDefault();
    axiosWithAuth().post(`http://localhost:5000/api/colors`, colorToAdd)
    .then(response => {
      updateColors(response.data);
      setColorToAdd(initialColor);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(response => {
      axiosWithAuth().get(`http://localhost:5000/api/colors`)
      .then(response => {
        updateColors(response.data);
        setEditing(false)
      })
    })
    .catch(error => {
      console.log(error);
    })
  };

  const LogOut =() => {
    sessionStorage.removeItem("token");
    props.history.push("/");
  }

  return (
    <div className="colors-wrap">
      <h2>colors</h2>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend style={{'color': 'yellow'}}>Edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
      
      {/* stretch - build another form here to add a color */}
      {!editing && (
      <form onSubmit={AddColor}>
          <legend>Add Color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Add Color</button>
          </div>
      </form>
      )}
      <div className="button-row">
        <button style={{'background-color': 'red'}} onClick={LogOut}>Log Out</button>
      </div>
      
      
    </div>
  );
};

export default ColorList;
