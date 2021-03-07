import React, { Component } from 'react';
import { Form, Input, Button, notification,Dropdown,Menu } from 'antd';
import { EMAIL_MAX_LENGTH } from '../../constants';
import { sendPasswordResetToken } from '../../util/APIUtils';
// import { DownOutlined, UserOutlined } from '@ant-design/icons';
const FormItem = Form.Item;

class ForgotPassword extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    isFormInvalid() {
        return !(
            this.state.email.validateStatus === 'success' 
        );
    }

    handleSubmit(event) {
        event.preventDefault();

        const tokenSendMail = {
            sender: this.state.email.value,
        };
         sendPasswordResetToken(tokenSendMail)
        .then(response => {
            console.log(".......rrrrrr............................."+response)
            notification.success({
                message: 'Polling App',
                description: "Email has been sent",
            });          
            this.props.history.push("/forgot-password");
        }).catch(error => {
            console.log("...................................."+error)
            notification.error({
                message: 'Polling App',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }


    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: 'success',
            errorMsg: null
        }
    }

    
    render(){
        return(
            <div>
                <Form onSubmit={this.handleSubmit} className="signup-form">
                        
                        <FormItem 
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input 
                                size="large"
                                name="email" 
                                type="email" 
                                autoComplete="off"
                                placeholder="Your email"
                                value={this.state.email.value} 
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)} />    
                        </FormItem>
                    
                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button"
                                disabled={this.isFormInvalid()}>Submit</Button>
                            
                        </FormItem>
                    </Form>
            </div>
        )
           
    }
}
export default ForgotPassword;