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
        status: ""
      };

      return {
        items: [...items, newItem],
        defaultValue: ""
      };
    });
  };

  setStatus = (id, status) => {
    this.setState(({ items }) => {
      items[id].status = status;

      return {
        items
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
              console.log(item.status);
              if (!this.state.filteredStatus && item.status !== "archive") {
                return (
                  <Todo.Item
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    checkItem={this.checkItem}
                    archiveItem={this.archiveItem}
                    setStatus={this.setStatus}
                    status={item.status}
                  />
                );
              }
              if (item.status === this.state.filteredStatus) {
                return (
                  <Todo.Item
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    checkItem={this.checkItem}
                    archiveItem={this.archiveItem}
                    setStatus={this.setStatus}
                    status={item.status}
                  />
                );
              }
            })}
          </ul>
        </div>
        <div className="Todo__footer">
          <div
            className={`Todo__tab ${this.state.filteredStatus === "checked" ? "Todo__tab--active" : ''}`}
            onClick={() => {
              this.setFilteredStatus("checked");
            }}
          >
            checked
          </div>
          <div
            className={`Todo__tab ${this.state.filteredStatus === false ? "Todo__tab--active" : ''}`}
            onClick={() => {
              this.setFilteredStatus(false);
            }}
          >
            all
          </div>
          <div
            className={`Todo__tab ${this.state.filteredStatus === "archive" ? "Todo__tab--active" : ''}`}
            onClick={() => {
              this.setFilteredStatus("archive");
            }}
          >
            archive
          </div>
        </div>
      </div>
    );
  }
}

Todo.Item = ({ text, id, status, setStatus }) => {
  console.log(status);
  return (
    <li className="Todo__item">
      <div className="Todo__item-checkItem">
        <label>
          <input
            name="isActive"
            type="checkbox"
            checked={status === "checked" ? true : false}
            onChange={() => {
              setStatus(id, "checked");
            }}
          />
        </label>
      </div>
      <div className={`Todo__item-text ${status === "checked" ? "Todo__item-text--checked" : ''}`}>{text}</div>
      <div
        className="Todo__archive-item"
        onClick={() => {
          setStatus(id, "archive");
        }}
      >
        [ Archive ]
      </div>
    </li>
  );
};
