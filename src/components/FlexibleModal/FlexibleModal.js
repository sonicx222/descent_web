import * as React from "react";

class FlexibleModal extends React.Component {
    render() {
      if (!this.props.isOpen) {
        return null;
      }
   
      return (
        <div className="flexible-modal">
          <div className="flexible-modal-header">
            {this.props.headerTitle}
          </div>
          <div className="flexible-modal-body">
            {this.props.renderBodyComponent()}
          </div>
        </div>
      );
    }
  };

export default FlexibleModal;