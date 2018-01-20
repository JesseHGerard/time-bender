import React from 'react';

class FoundItems extends React.Component {
  render() {
    let foundItems;
    if (this.props.GazeButtClicked) {
      foundItems = this.props.GazeButtClicked.map( (item, index) => {
        if (index !== 0) {
          return (
            <div className="item">
              <img src={ item.image } alt={ item.title } />
            </div>
          );
        } else {
          return;
        }
      });
    }


    return (
      <div>
        { foundItems }
      </div>
    );
  }
};

export default FoundItems;
