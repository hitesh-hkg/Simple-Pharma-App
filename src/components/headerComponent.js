import React,{Component} from 'react';
import {Button,Form,Input,Card,CardBody,CardHeader,FormGroup, FormFeedback,Label, Navbar ,NavbarBrand,NavItem,Nav,Collapse,NavbarToggler,Modal,ModalBody,ModalHeader} from 'reactstrap';
import {NavLink, Redirect} from 'react-router-dom';
class Header extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            isNavOpen:false,
            isModalOpen:false,
            username:'',
            isLoggedin:false,
            password:'',
            touched:{
                username:false,
                password:false
            }
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);    
        this.validate=this.validate.bind(this);
        this.handleBlur=this.handleBlur.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }

      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

      handleInputChange(event) {
        var target=event.target;
        var value=target.value;
        var name=target.name;
        this.setState(
            {
                [name]:value
            }
        );
      }
        validate()
        {
            var errors={
                username:'',
                password:''
            };
            if(this.state.touched.username && this.state.username != 'admin')
            {
                errors.username='username does not exists';
            }
            else if(this.state.touched.password&&this.state.password != 'admin123')
            {
                errors.password='username and password doesnot match'
            }
            return errors;
        }
        handleSubmit()
        {
            console.log('here');
            let err=this.validate();
            if(this.state.touched.username&&err.username=='' && this.state.touched.password && err.password=='')
            {
                this.setState({isLoggedin:true});
                localStorage.setItem('isLoggedin','true');
                localStorage.setItem('username',this.state.username);
                console.log(localStorage.getItem('isLoggedin'));
                this.toggleModal();
            }
        }
        handleBlur = (field) => (evt) => {
            this.setState({
                touched: { ...this.state.touched, [field]: true }
            });
        }
        logOut()
        {
            localStorage.setItem('isLoggedin','false');
            localStorage.setItem('username','');
        }    
    render()
    {
        const errors=this.validate(),sessV=[localStorage.getItem('isLoggedin'),localStorage.getItem('username')];
        return(
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src='logo192.png' height="30" width="41" alt='Pharma Pro' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/orders'><span className="fa fa-list fa-lg"></span> Orders</NavLink>
                            </NavItem>
                            </Nav>
                            {sessV[0]=='false'?(
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                                </NavItem>
                            </Nav>):(
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.logOut}><span className="fa fa-sign-out fa-lg"></span> logout</Button>
                                </NavItem>
                            </Nav>)
                            }
                        </Collapse>
                    </div>
                </Navbar>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form id='loginF' onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor='username' >UserName:</Label>
                                <Input type='text' name='username' id='username' value={this.state.username} valid={this.state.touched.username && errors.username === ''}
                                        invalid={errors.username !== ''}
                                        onBlur={this.handleBlur('username')}
                                        onChange={this.handleInputChange} placeholder='username/email'></Input>
                                <FormFeedback>{errors.username}</FormFeedback>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='password'>Password:</Label>
                                <Input type='password' name='password' value={this.state.password} id='password' valid={this.state.touched.password && errors.username === ''}
                                        invalid={errors.password !== ''}
                                        onBlur={this.handleBlur('password')}
                                        onChange={this.handleInputChange} placeholder='password'></Input>
                                <FormFeedback>{errors.password}</FormFeedback>
                            </FormGroup>
                            <Button type='button' value='submit' className='btn btn-lg btn-primary'onClick={this.handleSubmit} >Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Header;