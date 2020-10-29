import React from 'react'

class DataTest extends React.Component {

    getData = () => {
        console.log("Getting Data...")
    }

    render() {
        return (
            <div className="data-test">
                <h1>Testing</h1>
                {this.getData()}
            </div>
        )
    }
}

export default DataTest