import React,{Component} from 'react';
import {Media,Button,Form,Input,Card,CardBody,CardHeader,FormGroup,Label, Navbar ,NavLink,NavbarBrand,NavItem,Nav,Collapse,NavbarToggler,Modal,ModalBody,ModalHeader, Badge} from 'reactstrap';

class Orders extends Component{
    componentDidMount()
    {
        fetch('https://pure-citadel-32239.herokuapp.com/allorders',{
            method:'GET'
        })
            .then(res=>res.json())
            .then((data)=>this.setState({orders:data}))
            .catch((err)=>alert(err));  
    }
    constructor(props)
    {
        super(props);
        this.state={
            ordersT:[
                {
                    id:0,
                    description : 'Crocin-Tablet',
                    from:'HYD',
                    to:'MUM',
                    name: "X's order",
                    status : 'not shipped'
                },
                {
                    id:4,
                    description : 'Oxetol-Tablets',
                    from:'PUN',
                    to:'RAJ',
                    name: "Y's order",
                    status : 'not shipped'
                },
                {
                    id:2,
                    description : 'Acivir-Cream',
                    from:'HYD',
                    to:'BHU',
                    name: "P's order",
                    status : 'done'
                },
                {
                    id:1,
                    description : 'Bandy Plus',
                    from:'TN',
                    to:'MUM',
                    name: "X's order",
                    status : 'not shipped'
                },
                {
                    id:8,
                    description : 'Ketostar Lotion',
                    from:'KAR',
                    to:'MUM',
                    name: "P's order",
                    status : 'not shipped'
                },


            ],
            success:false,
            successOrd:null,
            tryagain:false,
            tryOrd:null
        }
        this.toggleSuc=this.toggleSuc.bind(this);
        this.toggleTry=this.toggleTry.bind(this);
        this.markComplete=this.markComplete.bind(this);
        //this.RenderOrder=this.RenderOrder.bind(this);
    }
        markComplete=(ord)=>
        {
            console.log('https://pure-citadel-32239.herokuapp.com/updatestatus/'+ord._id);
            fetch('https://pure-citadel-32239.herokuapp.com/updatestatus/'+ord._id,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'   
                }
            }).then((res)=>{return res.json();})
            .then((res)=>{
                ord=res;
                console.log(ord);
                let nords=this.state.orders.map((order)=>order._id==ord._id?ord:order);
                this.setState
                (
                    {
                        orders:nords,
                        successOrd:ord,
                        success:true
                    }
                );
            })
            .catch((er)=>{
                alert(er);this.setState({
                    tryOrd:ord,
                    tryagain:true
                });
            });
        }
        toggleSuc=()=>
        {
            this.setState(
                {
                    successOrd:null,
                    success:!this.state.success
                }
            );
            window.location.reload(false);
        }
        toggleTry=()=>
        {
            this.setState(
                {
                    tryOrd:null,
                    tryagain:!this.state.tryagain
                }
            );
            window.location.reload(false);
        }
    render()
    {

        const orders = (this.state.orders ? (this.state.orders.sort((o1,o2)=>{
            return (o1.status=='yes')-(o2.status=='yes')
        }).map((order) => {
            return (
                <div key={order.id} className="col-12 mt-5">
                    <Media tag="li">
                        <Media left middle>
                            <Media object src='logo192.png' alt={order.name} />
                        </Media>
                        <Media body className="ml-5">
                        <Media heading>{order.patient_name+"'s Order"}</Media>
                        <p>ID:{order._id}</p>
                        <p>Email:{order.email}</p>
                        <p>desc:{order.medicine.toString()}</p>
                        <p>Status:{order.status}</p>
                        {(order.status=='no')?(<Button onClick={()=> this.markComplete(order)} className='btn btn-md btn-primary'>Ship</Button>):<Badge>done</Badge>}
                        </Media>
                    </Media>
                </div>
            );
        })) : <li></li>);
        return(
            <div className='container'>
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Orders</h2>
                    </div>
                    <div className="col-12">
                        <Media list>
                            {orders}
                        </Media>
                    </div>
                </div>
                <Modal isOpen={this.state.success} toggle={this.toggleSuc}>
                    <ModalHeader toggle={this.toggleSuc}>Success</ModalHeader>
                    <ModalBody>
                    {this.state.successOrd?(
                        <div>
                            <ul className='list-unstyled'>
                                <li>{this.state.successOrd.id}</li>
                                <li>{this.state.successOrd.name}</li>
                                <li>{this.state.successOrd.description}</li>
                                <li>DONE</li>
                            </ul>
                        </div>
                    ):(<React.Fragment></React.Fragment>)}
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.tryagain} toggle={this.toggleTry}>
                    <ModalHeader toggle={this.toggleTry}>Try Again</ModalHeader>
                    <ModalBody>
                    {this.state.tryOrd?(
                        <div>
                            <ul className='list-unstyled'>
                                <li>{this.state.tryOrd.id}</li>
                                <li>{this.state.tryOrd.name}</li>
                                <li>{this.state.tryOrd.description}</li>
                                <li>Please Try Again!</li>
                            </ul>
                        </div>
                    ):(<React.Fragment></React.Fragment>)}
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
export default Orders;