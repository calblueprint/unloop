import React from 'react';

class ActionItemParticipant extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // 1. Render component
        // 2. Allow hover (show X) to remove the participant
        // 3. Color each name by their type/status in the current pipeline (R0, R1, or R2)
        return (
            <div>
                <p>This person is {this.props.name}!</p>
            </div>
        )
    }

}

export default ActionItemParticipant;