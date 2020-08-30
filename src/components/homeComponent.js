import React,{Component} from 'react';
import {Card,CardBody, CardHeader,CardImg} from 'reactstrap';
class Home extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            pp:"logo192.png",
            name:""
        };
    }
    render()
    {
        return(
            <div className='container'>
                <Card>
                    <CardHeader>Greetings</CardHeader>
                    <CardImg src={this.state.pp} alt={this.state.name} style={{width:200+'px'}}>
                    </CardImg>
                    <CardBody>
                        Welcome {this.state.name} !
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Home;