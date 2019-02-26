import React, { Component } from "react";
import "../style/style.scss";

export default class Todo extends Component {
  state = {
    items: [],
    defaultValue: "",
    filteredStatus: false
  };

  onNewItemTextChange = text => {
    this.setState(() => {
      return {
        defaultValue: text
      };
    });
  };

  addNewItem = () => {
    this.setState(({ defaultValue, items }) => {
      let newItem = {
        text: defaultValue,
        id: items.length,
        isDone: false
      };

      return {
        items: [...items, newItem],
        defaultValue: ""
      };
    });
  };

  setFilteredStatus = filteredStatus => {
    this.setState(() => {
      return {
        filteredStatus
      };
    });
  };

  setStatus = ( id ) => {
    this.setState((prevState) => {
      prevState.items[id].isDone = !this.state.items[id].isDone;

      return {
        prevState  
      };
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="Todo">
        <div className="Todo__header">
          <input
            type="text"
            className="Todo__new-item"
            value={this.state.defaultValue}
            onChange={event => {
              this.onNewItemTextChange(event.target.value);
            }}
            onKeyPress={key => {
              if (key.key === "Enter") {
                this.addNewItem();
              }
            }}
          />
          <button className="Todo__add-btn" onClick={this.addNewItem}>
            Add
          </button>
        </div>
        <div className="Todo__content">
          <ul className="Todo__list">
            {this.state.items.map(item => {
              if(!this.state.filteredStatus) {
                return (
                  <Todo.Item
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    checkItem={this.checkItem}
                    archiveItem={this.archiveItem}
                    setStatus={this.setStatus}
                    isDone={item.isDone}
                  />
                )
              }
              if(this.state.filteredStatus === 'active') {
                if(!item.isDone) {
                  return (
                    <Todo.Item
                      key={item.id}
                      id={item.id}
                      text={item.text}
                      checkItem={this.checkItem}
                      archiveItem={this.archiveItem}
                      setStatus={this.setStatus}
                      isDone={item.isDone}
                    />
                  )
                }
              }
              if(this.state.filteredStatus === 'archive') {
                if(item.isDone) {
                  return (
                    <Todo.Item
                      key={item.id}
                      id={item.id}
                      text={item.text}
                      checkItem={this.checkItem}
                      archiveItem={this.archiveItem}
                      setStatus={this.setStatus}
                      isDone={item.isDone}
                    />
                  )
                }
              }
            })}
          </ul>
        </div>
        <div className="Todo__footer">
          <div
            className="Todo__tab"
            onClick={() => {
              this.setFilteredStatus("active");
            }}
          >
            Active
          </div>
          <div
            className="Todo__tab"
            onClick={() => {
              this.setFilteredStatus(false);
            }}
          >
            All
          </div>
          <div
            className="Todo__tab"
            onClick={() => {
              this.setFilteredStatus("archive");
            }}
          >
            Archive
          </div>
        </div>
      </div>
    );
  }
}

Todo.Item = ({ text, id, isDone, setStatus }) => {
  return (
    <li className="Todo__item">
      <div className="Todo__item-checkItem">
        <label>
          <input
            name="isActive"
            type="checkbox"
            checked={isDone}
            onChange={() => {
              setStatus(id);
            }}
          />
        </label>
      </div>
      <div
        className={`Todo__item-text ${
          isDone ? "Todo__item-text--checked" : ""
        }`}
      >
        {text}
      </div>
    </li>
  );
};
