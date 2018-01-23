import React from 'react';

class Dashboard extends React.Component {

  render() {
    console.log(`currentItem: ${this.props.currentItem}`)
    let currentItem;
    if (this.props.currentItem < 3 && this.props.status === 'started') {
       let currentItemProp = this.props.items[this.props.currentItem];
      currentItem =
      <img
        className="current-item"
        src={ currentItemProp.consoleImage }
        alt={ currentItemProp.name }
      />;
    }

    return (
      <div className="dashboard">
        <div className="current-item-container">
          { currentItem }
        </div>
      </div>
    );
  }
};

export default Dashboard;
