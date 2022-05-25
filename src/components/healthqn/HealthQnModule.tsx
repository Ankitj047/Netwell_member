import React from 'react';
import Enrollment from './Enrollment/enrollment';

// const HealthQnModule = (props: any) => {

//     return (
//         <div>
//             <Enrollment />
//         </div>
//     )

// }

class HealthQnModule extends React.Component {
    constructor(props: any) {
        super(props)


    }

    componentDidMount() {
        console.log('this.props from module', this.props)
    }
    render() {
        return (
            <div>
                <Enrollment props={this.props} />
            </div >
        )
    }
}
export default HealthQnModule